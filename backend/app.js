const express = require('express'),
        app = express();

require('dotenv/config')

const api = process.env.API_URL;


app.get( api + '/products', (req, res) => {
        res.send('hello API !')
})


app.listen(3000, () => {
        console.log(api)
        console.log('server is running on http://localhost:3000');
})