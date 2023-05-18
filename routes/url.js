const express = require('express')
const router = express.Router();

//importing controller functions for handling
const {
    handleGetRequest,
    handlePostGenerateNewShortURL,
    handleRedirectUsingShortId,
    handleGetAnalytics
} = require("../controllers/url.js")


//routing to specific controller functions
router.get("/", handleGetRequest)
router.get("/:body", handleRedirectUsingShortId)
router.post("/", handlePostGenerateNewShortURL);
// router.get("/r/:shortId", handleRedirectUsingShortId);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;



// fix route issue
// get request not availabe fix