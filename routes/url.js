const express = require('express')
const router = express.Router();

//importing controller functions for handling
const {
    handlegenerateNewShortURL,
    handleRedirectShortId,
    handleGetAnalytics
} = require("../controllers/url.js")


//routing to specific controller functions
router.post("/", handlegenerateNewShortURL);
router.get("/:shortId", handleRedirectShortId);
router.get("/analytics/:shortId", handleGetAnalytics)

module.exports = router;