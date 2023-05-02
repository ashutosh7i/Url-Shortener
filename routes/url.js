const express = require('express')
const router = express.Router();

const { handlegenerateNewShortURL, handleRedirectShortId } = require("../controllers/url.js")


router.post("/", handlegenerateNewShortURL);
router.get("/:shortId", handleRedirectShortId);

module.exports = router;