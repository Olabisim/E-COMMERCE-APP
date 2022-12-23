const express = require('express')
const router = express.Router()
const {Product} = require('../model/Product')


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
router.post('/', (req, res) => {
        const {name, image, countInStock} = req.body;
        const product = new Product({
                name, image, countInStock
        })
        product.save()
                .then(createedProduct => res.status(201).json({createedProduct}))
                .catch(err => res.status(500).json({err, success: false}))
})


module.exports = router