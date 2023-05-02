const express = require("express");
const app = express();
const port = 7000;

const urlRoute = require("./routes/url")

const { connectToMongoDB } = require("./connectMongoDB")
connectToMongoDB("mongodb://127.0.0.1:27017/UrlShortener")
    .then(() => console.log("mongoDB connected"))

app.use(express.json())
app.use("/url", urlRoute)


app.listen(port, () => console.log(`Server started at port ${port}`))