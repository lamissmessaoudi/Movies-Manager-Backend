const mongoose = require('mongoose')
const Joi = require('joi');

const RentalSchema = mongoose.Schema({ //mongoose schema is the representation of the model in BD

    costumer: {
        type: new mongoose.Schema({
            name: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
            phone: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
            isGold: { type: Boolean, default: false }
        }),
        required: true,
    },

    movie: {
        type: new mongoose.Schema({
            title: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
            dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
        }),
        required: true,
    },
    dateOut: { type: Date, required: true, default: Date.now },
    dateOut: { type: Date, },
    rentalFee: { type: Number, required: true, min: 0, max: 255 },
})
const Rental = mongoose.model('Rental', RentalSchema)


function validateRental(rental) {
    const schema = { //joi schema is what the client sends to us (api input)
        costumerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    }

    return Joi.validate(rental, schema)

}
exports.Rental = Rental;
exports.validateRental = validateRental