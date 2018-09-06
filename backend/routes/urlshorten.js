const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const shortid = require("shortid");
const errorUrl = 'http://localhost/error';
module.exports = app => {
  app.post("/", async (req, res) => {
    const {
      originalUrl,
      shortBaseUrl
    } = req.body;
    const urlCode = shortid.generate();
    const updatedAt = new Date();

    if (!validUrl.isUri(shortBaseUrl)) {
      return res
        .status(401)
        .json(
          "Invalid Base Url"
        );
    } else {
      try {
        const item = await UrlShorten.findOne({
          originalUrl: originalUrl
        });
        if (item) {
          res.status(200).json(item);
        } else {
          shortUrl = shortBaseUrl + "/" + urlCode;
          const item = new UrlShorten({
            originalUrl,
            shortUrl,
            urlCode,
            updatedAt
          });
          await item.save();
          res.status(200).json(item);
        }
      } catch (err) {
        res.status(401).json("Invalid User Id");
      }
    }
  });
  app.get("/:shortenUrl", async (req, res) => {
    const urlCode = req.params.shortenUrl;
    const item = await UrlShorten.findOne({
      urlCode: urlCode
    });
    if (item) {
      return res.redirect(item.originalUrl);
    } else {
      return res.redirect(errorUrl);
    }
  })
};