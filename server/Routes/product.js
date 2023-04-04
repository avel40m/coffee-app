const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');
const upload = require('../libs/storage');
const path = require('path');
const fs = require('fs');

router.post('/',upload.single('image'), async (req,res) => {
    try {        
        const {name,price,category} = req.body
        console.log(req.body);
        imagen = req.file.filename;

        const newProduct = new Product({
            name:name,
            price:price,
            imgURL:imagen,
            category:category
        });
        await newProduct.save();
        res.status(201).json({newProduct});
    } catch (error) {
        return res.status(500).json({error})
    }
});

router.get('/images/:id',async (req,res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        const pathName = path.join(__dirname + `../../storage/imgs/${product.imgURL}`);
        res.sendFile(pathName);
    } catch (error) {
        res.status(500).json({message:error});
    }
})

router.get('/',async (req,res) => {
    try {
        const producto = await Product.find().populate('category');
        res.status(200).json({producto});
    } catch (error) {
        res.status(500).json({message:'Error en la base de datos'});
    }
});

module.exports = router;