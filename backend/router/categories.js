
const express = require('express');
const router = express.Router();
const {Category} = require('../model/category')

router.get('/', async (_, res) => {
        const category = await Category.find()

        if(!category) return res.status(500).json({success: false})

        return res.status(200).json({success: true, data: category})
})

// getting single category
router.get('/:id', async (req, res) => {
        const category = await Category.findById(req.params.id)

        if(!category) return res.status(500).json({success: false})

        return res.status(200).json({success: true, data: category, message: "category was found"})
})

router.put('/:id', async (req, res) => {

        const {name, icon, color} = req.body;

        // {new: true} means you are setting the new updated data.
        const category = await Category.findByIdAndUpdate(req.params.id, {name, icon, color}, {new: true})

        if(!category) return res.status(500).json({success: false})

        return res.status(200).json({success: true, data: category, message: "category updated!!!"})
})

router.post('/', async (req, res) => {
        const {name, color, icon} = req.body;
        
        let category = new Category({
                name, color, icon
        })

        category = await category.save()
        if(!category) return res.status(404).json({success: false, message: "category cannot be created! "})
        
        return res.status(200).json({success: true, message: "category saved successfully to the database"})
})

router.delete('/:id', (req, res) => {
        // :id must equals the id 
        Category.findByIdAndRemove(req.params.id)
                .then (category => {
                        if(!category) return res.status(404).json({success: false, message: "Category not found"})
                        return res.status(200).json({success: true, message: "category successfully removed from the database"})
                })
                .catch(err => res.status(400).json({success: false, error: err}))
})


module.exports =  router;