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

//handle the get request
async function handleGetRequest(req, res) {
    return res.render("Home")
}


//function to handle the get requests on ip/shortid and redirect to respective website from db
async function handleRedirectUsingShortId(req, res) {

    //parsing url from request body
    const shortId = req.params.body;

    //webdev simplified soln

    //finding the shortId in database
    const shortUrl = await URL.findOne({ shortId: shortId })

    //if not found then render 404 page
    if (shortUrl == null) return res.status(404).render("404");

    //if present in db, increase the visitHistory and redirect
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

//Generate a new shortId with form or POST
async function handlePostGenerateNewShortURL(req, res) {
    const body = req.body.url;
    //if url body absent,send error
    if (!body) return res.status(400).json({ error: "Invalid URL/URL Absent" })

    //generate a new short id
    const shortID = shortid.generate(7);

    //store the redirectURL and the assigned shortid in db
    await URL.create({
        shortId: shortID,
        redirectURL: body,
        visitHistory: [],
    });

    //return saved shortId
    // return res.json({ id: shortID })
    let redirect = `localhost:7000/${shortID}`;
    let analytics = `localhost:7000/analytics/${shortID}`;
    res.render("generated", { redirect, analytics })
}


// async function handlePostGenerateNewShortURL(req, res) {
//     const formUrl = req.body.url;

//     // If URL is absent or invalid, send an error response
//     if (!formUrl) {
//         return res.status(400).json({ error: "Invalid URL/URL Absent" });
//     }

//     // Generate a new short ID
//     const shortID = shortid.generate(7);

//     // Store the redirect URL and the assigned short ID in the database
//     await URL.create({
//         shortId: shortID,
//         redirectURL: formUrl,
//         visitHistory: [],
//     });

//     // Construct the URLs for redirect and analytics
//     const redirectURL = `localhost:7000/${shortID}`;
//     const analyticsURL = `localhost:7000/analytics/${shortID}`;

//     // Render the "generated.ejs" template with the URLs
//     res.render("generated", { redirectURL, analyticsURL });
// }



//fuction to handle the ip/analytics/shortid to show analyics
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    // return res.json({
    //     total_No_of_Clicks: result.visitHistory.length,
    //     Analytics: result.visitHistory
    // });
    res.render("analytics", {
        total_No_of_Clicks: result.visitHistory.length,
        Analytics: result.visitHistory
    })
}

module.exports = { handleGetRequest, handleRedirectUsingShortId, handlePostGenerateNewShortURL, handleGetAnalytics }