
const express = require('express');
const router = express.Router();
const {Category} = require('../model/category')

router.get('/', async (_, res) => {
        const category = await Category.find()

        if(!category) res.status(500).json({success: false})

        res.status(200).json({success: true, data: category})
})

// getting single category
router.get('/:id', async (req, res) => {
        const category = await Category.findById(req.params.id)

        if(!category) res.status(500).json({success: false})

        res.status(200).json({success: true, data: category, message: "category was found"})
})


router.post('/', async (req, res) => {
        const {name, color, icon} = req.body;
        
        const category = new Category({
                name, color, icon
        })

        await category.save()
        if(!category) res.status(404).json({success: false, message: "category cannot be created! "})
        
        res.status(200).json({success: true, message: "category saved successfully to the database"})
})

router.delete('/:id', (req, res) => {
        Category.findByIdAndRemove(req.params.id)
                .then (category => {
                        if(!category) res.status(404).json({success: false, message: "Category not found"})
                        res.status(200).json({success: true, message: "category successfully removed from the database"})
                })
                .catch(err => res.status(400).json({success: false, error: err}))
})


module.exports =  router;