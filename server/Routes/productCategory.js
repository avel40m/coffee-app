const express = require("express");
const Category = require("../Models/Category");
const jwt = require("jsonwebtoken");
const Users = require("../Models/Users");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const category = await Category.find({});
    res.send(category);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {    
    const { name } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
  
    if (!token) return res.status(403).send({ message: "El token es vacio" });
  
    if (name === undefined || name === null || name === "") return res.status(404).send({ message: "El nombre no debe ser vacio" });
  
    jwt.verify(token,'myclavesecret', async (error,data) => {
  
      if(error) return res.status(500).send({ message: error.message });
  
      const user = await Users.findById(data.userId);
  
      if(user === null) return res.status(404).send({ message: 'User not found' });
  
      if(user.permission !== 'admin') return res.status(403).send({ message: 'Permission denied' });
  
      const category = new Category({name});
  
      await category.save();
    
      return res.status(201).json(category);
    });
  } catch (error) {
      res.status(500).json({message:error})    
  }
      
});

module.exports = router;
