const express = require("express");
const app = express();
const port = 7000;

//main router to handle requests
const urlRoute = require("./routes/url")

//mongodb connection
const { connectToMongoDB } = require("./connectMongoDB")
connectToMongoDB("mongodb://127.0.0.1:27017/UrlShortener")
    .then(() => console.log("mongoDB connected"))

//json middleware for body parsing
app.use(express.json())

//sending all requests to the router
app.use("/", urlRoute)

app.listen(port, () => console.log(`Server started at port ${port}`))