const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Fawn = require('fawn')
const { Costumer } = require('../models/customer');
const { Genre } = require('../models/genre');
const { validateMovie, Movie } = require('../models/movie');
const { Rental, validateRental } = require('../models/rental');

Fawn.init(mongoose)

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut')
    res.send(rentals)
})

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    const costumer = await Costumer.findById(req.body.costumerId)
    if (!costumer) return res.status(400).send('Invalid costumer')

    const movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(400).send('Invalid movie')

    if (movie.numberInStock === 0) return res.status(400).send('Movie not available')


    let rental = new Rental({
        movie:
        {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        },
        costumer:
        {
            _id: costumer._id,
            name: costumer.name,
            phone: costumer.phone,
        }
    })
    /* //we want these operations to happen all succesfully or don't happen at all => FAWN PKG
        rental = await rental.save();
        movie.numberInStock--;
        movie.save();*/

    //transaction
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run()
        res.send(rental);
    }
    catch (err) { res.status(500).send('somethin failed !!') }
})

// router.put('/:id', async (req, res) => {
//     const { error } = validateRental(req.body);
//     if (error) return res.status(400).send(error.details[0].message)


//     const genre = await Genre.findById(req.body.genreId);
//     if (!genre) return res.status(400).send('Invalid genre.');

//     const rental = await Movie.findByIdAndUpdate(req.params.id, {
//         title: req.body.title,
//         numberInStock: req.body.numberInStock,
//         dailyRentalRate: req.body.dailyRentalRate,
//         genre: {
//             _id: genre._id,
//             name: genre.name
//         },
//     }, { new: true })
//     if (!rental) return res.status(404).send('NOT FOUND ')//404

//     //input validation using joi 

//     res.send(movie);
// })

router.get('/:id', async (req, res) => {
    const rental = Rental.findById(req.params.id)
    if (!rental) return res.status(404).send('NOT FOUND ')//404
    res.send(rental);
})

router.delete('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id)
    if (!rental) return res.status(404).send('NOT FOUND ')//404

    res.send(rental)
})

module.exports = router;