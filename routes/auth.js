const express = require('express')
const { User } = require('../models/user')
const Joi = require('joi')
const router = express()
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).send({ message: "Invalid Username & Password!" })
        }

        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        )

        if (!validPassword)
            return res.status(401).send({ message: "Invalid Username & Password" })

        const token = user.generateAuthToken();
        res.status(200).send({ token: token, message: "Logged in Success ", type: user.type })
    }
    catch (err) {
        res.status(500).send({ message: "Internal sever error!" })
    }
})

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().label("Email"),
        password: Joi.string().required().label("Password"),

    })

    return schema.validate(data)
}

module.exports = router