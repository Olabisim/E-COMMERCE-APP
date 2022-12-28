const express = require('express')
const router = express.Router()
const {Product} = require('../model/Product')
const {Category} = require('../model/category')


router.get('/', async (_, res) => {
        const product =  await Product.find()

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


router.post('/', async (req, res) => {

        const {name,description, richDescription, image, images, price, category, countInStock, rating, numReviews, isFeatured} = req.body;

        const categoryCollected = await Category.findById(category)

        if(!categoryCollected) res.status(400).json({success: false, message: "category cannot be  found"})

        const product = new Product({
                name,description, richDescription, image, images, price, category: categoryCollected, countInStock, rating, numReviews, isFeatured
        })

        product.save()
                .then(createedProduct => res.status(201).json({createedProduct}))
                .catch(err => res.status(500).json({err, success: false}))
                
})


module.exports = router