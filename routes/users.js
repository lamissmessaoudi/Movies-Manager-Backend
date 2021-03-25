const express = require('express');
const router = express.Router();
const _ = require('lodash')
const mongoose = require('mongoose')
const { validateuser, User } = require('../models/user')



router.post('/', async (req, res) => {

    //input validation using joi 
    const { error } = validateuser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User already registered")
    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    await user.save();



    res.send(_.pick(user, ['_id', 'name', 'email']))
})


module.exports = router;