const mongoose = require('mongoose')
const Joi = require('joi'); //  Joi is a class


const CostumerSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
    phone: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
    isGold: { type: Boolean, default: false }
})
const Costumer = mongoose.model('Costumer', CostumerSchema)


function validateCostumer(costumer) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        phone: Joi.string().min(5).max(255).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(costumer, schema)

}
exports.Costumer = Costumer;
exports.validateCostumer = validateCostumer