const express = require('express');
const connectDb = require("./config/config")
const commentRoute = require("./routes/commentRoutes")
const app = express()
const port = 4000
app.use(express.json())
//test start
const axios = require("axios");
const { response } = require('express');
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/"
})

const testAuth = async (req, res, next) => {
    try {
        const header = req.headers.authorization

        const userResponse = await axiosInstance({
            url: `auth`,
            method: "get",
            headers: {
                "authorization":
                    header
            }
        });

        const checkUserDetails = userResponse.data
        if ("id" in checkUserDetails.user && "authorize" in checkUserDetails) {
            if (checkUserDetails.authorize === true) {
                // res.json(checkUserDetails)
                next()
            } else {
                res.status(401).json({ msg: "Not authorize" })
            }
        } else {
            res.status(404).json({ msg: "User not found" })
        }
    } catch (error) {
        res.status(500).json(error.message)
        // console.log(error)
    }
}

app.use(testAuth)
//test end
app.use("/", commentRoute)
connectDb.startConnection(app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
}))
