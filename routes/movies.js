const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Genre } = require('../models/genre');
const { validateMovie, Movie } = require('../models/movie')


router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title')
    res.send(movies)
})

router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send('Invalid genre')

    const movie = new Movie({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            name: genre.name,
            _id: genre._id
        }
    })
    await movie.save();
    res.send(movie);
})

router.put('/:id', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message)


    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        },
    }, { new: true })
    //look up the movie 
    if (!movie) return res.status(404).send('NOT FOUND ')//404

    //input validation using joi 

    res.send(movie);
})

router.get('/:id', async (req, res) => {
    const movie = Movie.findById(req.params.id)
    if (!movie) return res.status(404).send('NOT FOUND ')//404
    res.send(movie);
})

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id)
    if (!movie) return res.status(404).send('NOT FOUND ')//404

    res.send(movie)
})

module.exports = router;