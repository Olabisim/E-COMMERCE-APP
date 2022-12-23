
const express = require('express')
const router = express.Router()
const {Order} = require('../model/order')

router.get('/', async (_, res) => {
        const order = await Order.find()

        if(!order) {
                res.status(500).json({success: false})
        }

        res.status(200).json({success: true, data: order})
})


module.exports =  router;