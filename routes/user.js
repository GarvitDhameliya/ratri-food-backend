const express = require('express')
const { validate, User } = require('../models/user')
const router = express()
const bcrypt = require('bcrypt')

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body)
        // console.log(err, "errrr")
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        const user = await User.findOne({ email: req.body.email })

        if (user)
            return res.status(409).send({ message: "User with the email already exist!" })


        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashpassword = await bcrypt.hash(req.body.password, salt)
        await new User({ ...req.body, password: hashpassword }).save()
        res.status(201).send({ message: "User Created Successfully" })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Internal server error" })
    }
})

module.exports = router