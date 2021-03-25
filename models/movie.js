const mongoose = require('mongoose')
const Joi = require('joi'); 7//  Joi is a class
const { genreSchema } = require('./genre')

const MovieSchema = mongoose.Schema({ //mongoose schema is the representation of the model in BD
    title: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
    numberInStock: { type: Number, required: true, min: 0, max: 255 },
    dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
    genre: genreSchema
})
const Movie = mongoose.model('Movie', MovieSchema)


function validateMovie(movie) {
    const schema = { //joi schema is what the client sends to us (api input)
        title: Joi.string().min(5).max(255).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
        genreId: Joi.string().required(),
    }

    return Joi.validate(movie, schema)

}
exports.Movie = Movie;
exports.validateMovie = validateMovie