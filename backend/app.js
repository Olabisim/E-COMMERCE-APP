const express = require('express'),
        app = express(),
        morgan = require('morgan'),
        mongoose = require('mongoose'),
        productRoutes = require('./router/product.js'),
        orderRoutes = require('./router/orders'),
        categoryRoutes = require('./router/categories'),
        userRoutes = require('./router/users'),
        cors = require('cors'),
        authJwt =  require('./helpers/jwt')


require('dotenv/config')

const api = process.env.API_URL;

// cors 
app.use(cors())
app.options('*', cors())

// middleware 
app.use(express.json())
app.use(morgan('tiny'))
app.use(authJwt())

// routes
app.use(api + '/products', productRoutes)
app.use(api + '/orders', orderRoutes)
app.use(api + '/category', categoryRoutes)
app.use(api + '/user', userRoutes)


mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => console.log("connection successful"))
.catch(err => console.log(err))


app.listen(3000, () => {
        console.log('server is running on http://localhost:3000');
})