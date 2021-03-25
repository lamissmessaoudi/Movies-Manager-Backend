const mongoose = require('mongoose')
const Joi = require('joi'); //  Joi is a class


const genreSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
})

const Genre = mongoose.model('Genre', genreSchema)


function validategenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genre, schema)

}

exports.Genre = Genre;
exports.validategenre = validategenre;
exports.genreSchema = genreSchema;
