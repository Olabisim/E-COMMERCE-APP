const express = require('express'),
        app = express();

require('dotenv/config')

const api = process.env.API_URL;

// middleware 
app.use(express.json())


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


app.listen(3000, () => {
        console.log('server is running on http://localhost:3000');
})