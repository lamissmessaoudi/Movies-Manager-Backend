const mongoose = require('mongoose')
const Joi = require('joi'); //  Joi is a class


const userSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50, trim: true },
    email: { type: String, required: true, minlength: 5, maxlength: 255, trim: true, unique: true },
    password: { type: String, required: true, minlength: 5, maxlength: 1024, trim: true },

})

const User = mongoose.model('User', userSchema)


function validateuser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required(),
    }

    return Joi.validate(user, schema)

}

exports.User = User;
exports.validateuser = validateuser;
