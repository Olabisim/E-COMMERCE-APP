
const express = require('express')
const router = express.Router();
const {User} = require('../model/user')
const bcrypt = require('bcryptjs')


router.get('/', async (_, res) => {
        const user = await User.find().select("-passwordHash");

        if(!user) res.status(500).json({success: false})

        res.status(200).json({success: true, data: user})
})

router.get('/:id', async (req, res) => {
        const user = await User.findById(req.params.id).select("-passwordHash");

        if(!user) res.status(500).json({success: false})

        res.status(200).json({success: true, data: user})
})

router.post('/', async (req,res)=>{
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        })
        

        user = await user.save();
    
        if(!user) return res.status(400).send('the user cannot be created!')
    
        res.send(user);
})
    

module.exports =  router;