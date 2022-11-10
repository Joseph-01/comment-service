const express = require('express');
const connectDb = require("./config/config")
const commentRoute = require("./routes/commentRoutes")
const cors = require("cors");
const app = express()
const port = process.env.PORT || 4000
const swaggerUI = require("swagger-ui-express")
const swaggerDocs = require("swagger-jsdoc")


//swagger options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "comment-service",
            version: "0.0.1",
            description: "This is the comment service"
        },
        servers: [
            {
                // url: "http://localhost:4000"
                url: "https://comment-api-shugr.cyclic.app/"
            }
        ]
    },
    apis: [
        "./controllers/*.js"
    ]
}

const specs = swaggerDocs(options)

app.use(cors())
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use(express.json())

app.use("/", commentRoute)
connectDb.startConnection(app.listen(port, () => {
    console.log(`Hello to you`);
}))
