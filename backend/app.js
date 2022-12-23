const express = require('express'),
        app = express(),
        morgan = require('morgan'),
        mongoose = require('mongoose');

require('dotenv/config')

const api = process.env.API_URL;

// middleware 
app.use(express.json())
app.use(morgan('tiny'))

const productSchema = mongoose.Schema({
        name: String,
        image: String,
        countInStock: {type: String, required: true}
})

const Product = mongoose.model('Product', productSchema)

app.get( api + '/products', async (req, res) => {
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
app.post( api + '/products', (req, res) => {
        const {name, image, countInStock} = req.body;
        const product = new Product({
                name, image, countInStock
        })
        product.save()
                .then(createedProduct => res.status(201).json({createedProduct}))
                .catch(err => res.status(500).json({err, success: false}))
})

mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => console.log("connection successful"))
.catch(err => console.log(err))


app.listen(3000, () => {
        console.log('server is running on http://localhost:3000');
})