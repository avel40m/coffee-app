const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/Users');
const Users = require('../Models/Users');

const router = express.Router();

router.post('/register', async (req,res) => {
    try {
        const {username,password,email} = req.body;
        const hashedPassword = bcrypt.hashSync(password,10);

        const user = new User({
            username,
            password:hashedPassword,
            email
        });
        await user.save();

        res.status(201).json({mensaje: 'Usuario registrado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje: 'Hubo un error al registrar el usuario'});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if (user === null) {
            return res.status(401).json({mensaje: 'El email no exite en la base de datos'});
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).send({mensaje: 'Credenciales incorrectas'});
        }
        
        const token = jwt.sign({userId: user._id},'myclavesecret');

        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje:'Hubo un error al iniciar la sesion'});
    }
});

router.get('/access-token', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).send('No existe token');
    }
    jwt.verify(token,'myclavesecret',async (err,decoded) => {
        if (err) {
            return res.send(err.message)
        }
        const users = await Users.findById(decoded.userId);
        
        if (users === null) {
            return res.send('Users no encontrado')
        }
        return res.send(users);
    })
});

module.exports = router;