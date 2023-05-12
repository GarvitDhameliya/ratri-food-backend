const mongoose = require('mongoose')


module.exports = () => {
    const connectionParams = {
        dbName: "ratrifood",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        mongoose.connect(process.env.DB, connectionParams)
        console.log("connected Successfully")
    }
    catch (err) { console.log(err) }

}