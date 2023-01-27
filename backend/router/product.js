const express = require('express')
const router = express.Router()
const {Product} = require('../model/Product')
const {Category} = require('../model/category')


router.get('/', async (req, res) => {

        let filter = {}

        if(req.query.categories) filter =  {category: req.query.categories.split(',')}

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
        const product = await Product.findById(req.params.id)

        if(!product) res.status(500).json({error: 'error occured'})

        res.status(200).json({success: true, data: product})
})


router.post('/', async (req, res) => {

        const {name,description, richDescription, image, images, price, category, countInStock, rating, numReviews, isFeatured} = req.body;

        Category.findById(category)
                .then((category) => {
                        if(!category) res.status(400).json({success: false, message: "category cannot be  found"})
                })


        const product = new Product({
                name,description, richDescription, image, images, price, category, countInStock, rating, numReviews, isFeatured
        })

        product.save()
                .then(createedProduct => res.status(201).json({createedProduct}))
                .catch(err => res.status(500).json({err, success: false}))
                
})

router.put('/:id', ({params, body}, res) => {

        Category.findById(body.category)
        .then(category => {if (!category) res.status(400).json({success: false, message: "category not found"})})

        
        const {name,description, richDescription, image, images, price, category, countInStock, rating, numReviews, isFeatured} = body;

        Product.findByIdAndUpdate(params.id, {name,description, richDescription, image, images, price, category, countInStock, rating, numReviews, isFeatured}, {new: true})

        .then((data) => res.status(200).json({success: true, data }))

        .catch(err => res.status(500).json({err}))

})

router.delete('/:id', ({params}, res) => {

        Product.findByIdAndRemove(params.id)

        .then(category => {res.status(400).json({success: true, message: "category deleted from the database", category})})

        .catch(err => res.status(404).json({success: false, message: "category not found", err}))
})

router.get('/get/count', async (_, res) => {

        const productCount = await Product.countDocuments()

        if(!productCount) res.status(400).json({success: false, message: "can't find productCount" })

        res.status(200).json({success: true, message: "counted successfully", count: productCount})

})

router.get('/get/features/:count', async ({params}, res) => {

        const count = params.count ? params.count : 0;

        const productFeatures = await Product.find({isFeatured: true}).limit(+count)

        if(!productFeatures) res.status(400).json({success: false, message: "can't find productFeatures"})

        res.status(200).json({success: true, message: "counted features successfully", products: productFeatures })

})


module.exports = router