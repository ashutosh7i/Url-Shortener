/*we will use nano id to generate nano id for the url
ex-
nonoid(5)=A3K88
nonoid(7)=JK7HIH7
*/
const { nanoid } = require("nanoid")

//importing database
const URL = require("../models/url")

async function handlegenerateNewShortURL(req, url) {

    const body = req.body;

    //if url body absent,send error
    if (!body.url) return res.status(400).json({ error: "Invalid URL/URL Absent" })

    //generate a new short id
    const shortID = nanoid(7);

    //store the redirectURL and the assigned shortid in db
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    //return saved shortId
    return res.json({ id: shortID })
}

module.exports = {handlegenerateNewShortURL}