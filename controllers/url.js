/*we will use nano id to generate nano id for the url
ex-
shortid(5)=A3K88
shortid(7)=JK7HIH7
*/
const shortid = require('shortid');
const moment = require("moment")
let date = moment().format("DD MM YYYY, hh:mm:ss a");
//importing database
const URL = require("../models/url")

async function handlegenerateNewShortURL(req, res) {
    const body = req.body;
    //if url body absent,send error
    if (!body.url) return res.status(400).json({ error: "Invalid URL/URL Absent" })

    //generate a new short id
    const shortID = shortid.generate(7);

    //store the redirectURL and the assigned shortid in db
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    //return saved shortId
    return res.json({ id: shortID })
}

//function to handle the get requests on ip/url/shortid and redirect to respective website from db
async function handleRedirectShortId(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: { timestamp: date, ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress }
            }
        }
    );
    res.redirect(entry.redirectURL)
}

//fuction to handle the ip/analytics/shortid to show analyics
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        total_No_of_Clicks: result.visitHistory.length,
        Analytics: result.visitHistory
    });
}

module.exports = { handlegenerateNewShortURL, handleRedirectShortId, handleGetAnalytics }