const mongoose = require("mongoose")
require("dotenv").config()


const connection = (connectionString) => {
    mongoose.connect(connectionString)
    .then(() => console.log("dbconnection working"))
    .catch((err) => console.log(err))
}

const startConnection = async (listenPort) => {
    try {
        await connection(process.env.MONGODB_URI)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    startConnection
}