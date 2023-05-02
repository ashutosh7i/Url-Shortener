const express = require('express')
const router = express.Router();

const { handlegenerateNewShortURL } = require("../controllers/url.js")

router.post("/", handlegenerateNewShortURL);
module.exports = router;