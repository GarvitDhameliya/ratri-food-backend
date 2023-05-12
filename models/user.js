const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passComplexity = require('joi-password-complexity')
const Joi = require('joi')


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: "2d" })
    return token
}

const User = mongoose.model("user", userSchema)

const validate = (data) => {

    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().required().label("Email"),
        type: Joi.string().required().label("Type"),
        password: passComplexity().required().label("Password"),

    })

    return schema.validate(data)
}

module.exports = { User, validate }