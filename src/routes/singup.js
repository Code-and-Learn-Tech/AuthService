const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = await User.insertOne({name, email, password});
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;