const express = require('express')
const router = express.Router()
const {Product} = require('../model/Product')
const {Category} = require('../model/category')
const multer = require('multer')
const { default: mongoose } = require('mongoose')


// list of extensions to be allowed to be uploaded
const FILE_TYPE_MAP = {
        'image/png': 'png',
        'image/jpeg': 'jpeg',
        'image/jpg': 'jpg',
};
    


const storage = multer.diskStorage({
        destination: function (req, file, cb) {
                const isValid = FILE_TYPE_MAP[file.mimetype];
                let uploadError = new Error('invalid image type');
                if (isValid) uploadError = null;
                cb(uploadError, 'public/uploads');
        },
        filename: function (req, file, cb) {

                const fileName = file.originalname.split(' ').join('-')
                const extension = FILE_TYPE_MAP[file.mimetype];

                // file mimetype includes the details of the extension - it automatically assings the extension that was picked.
                //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                //   cb(null, fileName + '-' + Date.now())  // before adjusting the whole file names.
                cb(null, `${fileName}-${Date.now()}.${extension}`)
        }
})
      
const uploadOptions = multer({ storage: storage })


router.get('/', async (req, res) => {

        let filter = {}

        // req.categories is getting the number of categories by the string query 
        // the query is the field after the question mark....

        if(req.query.categories) filter =  {category: req.query.categories.split(',')}
        // Product.find().select('name image -_id') // only display names and images removing the _id because of the - at the front. 
        // with populate category it will fill all the generated products with category.  


        // if there is something to filter it will filter, if there is nothing to filter it won't
        const product =  await Product.find(filter).populate('category')

        if(!product) {
                res.status(500).json({
                        error: "error occured"
                })
        }

        res.status(200).json({
                success: true,
                data: product
        })

})

router.get('/:id', async (req, res) => {
        // displaying a product with category details
        const product = await Product.findById(req.params.id).populate('category') //populate means any connected field will be filled in the document. 

        if(!product) res.status(500).json({error: 'error occured'})

        res.status(200).json({success: true, data: product})
})


router.post('/', async (req, res) => {

        res.send('passed the upload file middleware part')

        console.log("entered the route function post request")

        // const category = await Category.findById(req.body.category);
        // if (!category) return res.status(400).send('Invalid Category');
    
        const file = req.file;
        if (!file) return res.status(400).send('No image in the request');
    
        const fileName = file.filename;

        
        console.log("passed the file creation request function post request")


        // req.get('host') this is the way to get the host from the request.
        
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: `${basePath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232"
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        });
        
        console.log("created the product in the model Product!")
    
        product = await product.save();
    
        if (!product) return res.status(500).send('The product cannot be created');
    
        res.send(product);
                
})

router.put('/:id', uploadOptions.single('image'), async ({params, body, file, protocol, get}, res) => {

        // checking for invalid object id
        if(!mongoose.isValidObjectId(params.id)) return res.status(400).send('Invalid Product Id')


        Category.findById(body.category)
        .then(category => {if (!category) res.status(400).json({success: false, message: "category not found"})})

        const product = await Product.findById(params.id);
        if(!product) return res.status(400).send('Invalid Product!');

        let imagepath;
        
        if (file) {
                const fileName = file.filename;
                const basePath = `${protocol}://${get('host')}/public/uploads/`;
                imagepath = `${basePath}${fileName}`;
        } else {
                imagepath = product.image;
        }
        
        const {name,description, richDescription, price, category, countInStock, rating, numReviews, isFeatured} = body;

        Product.findByIdAndUpdate(params.id, {name,description, richDescription, image: imagepath, price, category, countInStock, rating, numReviews, isFeatured}, {new: true})

        .then((data) => res.status(200).json({success: true, data }))

        .catch(err => res.status(500).json({err}))

})

router.delete('/:id', ({params}, res) => {

        Product.findByIdAndRemove(params.id)

        .then(category => {res.status(200).json({success: true, message: "category deleted from the database", category})})

        .catch(err => res.status(404).json({success: false, message: "category not found", err}))
})

router.get('/get/count', async (_, res) => {
        
        // const productCount = await Producr.countDocuments((count) => count) 
        const productCount = await Product.countDocuments()

        if(!productCount) res.status(400).json({success: false, message: "can't find productCount" })

        res.status(200).json({success: true, message: "counted successfully", count: productCount})

})

router.get('/get/features/:count', async ({params}, res) => {
 
        const count = params.count ? params.count : 0;

        // .limit is limited to the total number of the available document. 
        // adding a plus behind the count make it a number from a string, plus at the front changes the datatype from a string to a number
        const productFeatures = await Product.find({isFeatured: true}).limit(+count)
 
        if(!productFeatures) res.status(400).json({success: false, message: "can't find productFeatures"})

        res.status(200).json({success: true, message: "counted features successfully", products: productFeatures })

})

// maximum of 10 files in a reques t
router.put('/gallery-images/:id', uploadOptions.array('images', 10), async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
        }

        const files = req.files;
        let imagesPaths = [];
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

        if (files) {
        // creating the array links of the files
        files.map((file) => {
                imagesPaths.push(`${basePath}${file.filename}`);
        });
        }
    
        const product = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    images: imagesPaths,
                },
                { new: true }
        );
    
        if (!product)
        return res.status(500).send('the gallery cannot be updated!');
    
        res.send(product);
});

module.exports = router;