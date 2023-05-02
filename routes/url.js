const express = require('express')
const router = express.Router();

const { handlegenerateNewShortURL } = require("../controllers/url")

router.post("/", handlegenerateNewShortURL(req, res));
module.exports = router;