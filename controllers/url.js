const shortid = require('shortid');
const moment = require("moment");
const URL = require("../models/url");

// Handle the GET request
async function handleGetRequest(req, res) {
    try {
        return res.render("Home");
    } catch (error) {
        console.error(error);
        res.status(500).render("500");
    }
}

// Handle the GET requests on /shortid and redirect to the respective website from the database
async function handleRedirectUsingShortId(req, res) {
    try {
        const shortId = req.params.shortId;

        const shortUrl = await URL.findOne({ shortId });

        if (!shortUrl) {
            return res.status(404).render("404");
        }

        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: { timestamp: moment().format("DD MM YYYY, hh:mm:ss a"), ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress }
                }
            }
        );

        res.redirect('https://'+entry.redirectURL);
    } catch (error) {
        console.error(error);
        res.status(500).render("500");
    }
}

// Generate a new shortId with the provided URL
async function handlePostGenerateNewShortURL(req, res) {
    try {
        const body = req.body.url;

        if (!body) {
            return res.status(400).json({ error: "Invalid URL/URL Absent" });
        }

        const shortID = shortid.generate(7);

        await URL.create({
            shortId: shortID,
            redirectURL: body,
            visitHistory: [],
        });

        const redirectURL = `localhost:7000/${shortID}`;
        const analyticsURL = `localhost:7000/analytics/${shortID}`;

        res.render("generated", { redirectURL, analyticsURL });
    } catch (error) {
        console.error(error);
        res.status(500).render("500");
    }
}

// Handle the GET request on /analytics/shortid to show analytics
async function handleGetAnalytics(req, res) {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });

        res.render("analytics", {
            total_No_of_Clicks: result.visitHistory.length,
            Analytics: result.visitHistory
        });
    } catch (error) {
        console.error(error);
        res.status(500).render("500");
    }
}

module.exports = {
    handleGetRequest,
    handleRedirectUsingShortId,
    handlePostGenerateNewShortURL,
    handleGetAnalytics
};
