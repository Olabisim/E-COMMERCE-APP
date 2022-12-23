
const express = require('express');
const router = express.Router();
const Category = require('../model/category')

router.get('/', async (_, res) => {
        const category = await Category.find()

        if(!category) res.status(500).json({success: false})

        res.status(200).json({success: false, data: category})
})


module.exports =  router;