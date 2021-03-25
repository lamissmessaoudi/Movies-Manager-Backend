const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const { validateCostumer, Costumer } = require('../models/customer')


router.get('/', async (req, res) => {
    const costumers = await Costumer.find().sort('name')
    res.send(costumers)
})

router.post('/', async (req, res) => {
    const { error } = validateCostumer(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)


    let costmer = new Costumer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    costmer = await costmer.save();
    res.send(costmer);
})

router.put('/:id', async (req, res) => {
    const { error } = validateCostumer(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const costumer = await Costumer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true })
    //look up the costumer 
    if (!costumer) return res.status(404).send('NOT FOUND ')//404

    //input validation using joi 

    res.send(costumer);
})


router.get('/:id', async (req, res) => {
    const costumer = Costumer.findById(req.params.id)
    if (!costumer) return res.status(404).send('NOT FOUND ')//404
    res.send(costumer);
})

router.delete('/:id', async (req, res) => {
    const costumer = await Costumer.findByIdAndRemove(req.params.id)
    if (!costumer) return res.status(404).send('NOT FOUND ')//404

    res.send(costumer)
})


module.exports = router;