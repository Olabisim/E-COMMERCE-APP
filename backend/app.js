const express = require('express'),
        app = express(),
        morgan = require('morgan'),
        mongoose = require('mongoose');

require('dotenv/config')

const api = process.env.API_URL;

// middleware 
app.use(express.json())
app.use(morgan('tiny'))

app.get( api + '/products', (req, res) => {
        const product = {
                id: 1,
                name: "hair dresser",
                image: 'some_url'
        }
        res.send(product)
})
app.post( api + '/products', (req, res) => {
        const product = req.body;
        res.send(product)
})

mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => console.log("connection successful"))
.catch(err => console.log(err))


app.listen(3000, () => {
        console.log('server is running on http://localhost:3000');
})