const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({email});
        console.log(user);
        if (!user) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        if (bcrypt.compareSync(user.password,password)) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        var token = jwt.sign({ email: user.email }, secretKey,{ expiresIn: '1h' });
        res.status(201).json({ token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;