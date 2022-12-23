
const express = require('express')
const router = express.Router();
const {User} = require('../model/user')


router.get('/', async (_, res) => {
        const user = await User.find();

        if(!user) res.status(500).json({success: false})

        res.status(200).json({success: true, data: user})
})


module.exports =  router;