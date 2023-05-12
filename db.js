const mongoose = require('mongoose')


module.exports = () => {
    try {
        mongoose.connect(process.env.DB)
        console.log("connected Successfully")
    }
    catch (err) { console.log(err) }

}