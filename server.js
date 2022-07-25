const express = require('express');
const connectDb = require("./config/config")
const commentRoute = require("./routes/commentRoutes")
const app = express()
const port = 4000
app.use(express.json())

app.use("/", commentRoute)
connectDb.startConnection(app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
}))
