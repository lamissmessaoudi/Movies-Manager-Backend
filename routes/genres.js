const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const { validategenre, Genre } = require('../models/genre')

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name')
    res.send(genres)
})

router.post('/', async (req, res) => {

    //input validation using joi 
    const { error } = validategenre(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)


    const genre = new Genre({
        name: req.body.name // we can read it thnx to the middleware
    })
    await genre.save();
    //convention: when we add a new object to the server we should return 
    //that obj into the body of the response since the client may need its id 
    res.send(genre);
})

router.put('/:id', async (req, res) => {
    const { error } = validategenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    //look up the genre 
    if (!genre) return res.status(404).send('NOT FOUND ')//404

    //input validation using joi 

    res.send(genre);
})


router.get('/:id', async (req, res) => {
    const genre = Genre.findById(req.params.id)
    if (!genre) return res.status(404).send('NOT FOUND ')//404
    res.send(genre);
})

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) return res.status(404).send('NOT FOUND ')//404

    res.send(genre)
})


module.exports = router;