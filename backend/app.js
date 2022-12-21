const express = require('express'),
        app = express();


app.get('/', (req, res) => {
        res.send('hello API !')
})


app.listen(3000, () => {
        console.log('server is running on http://localhost:3000');
})