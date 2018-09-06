const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlModel = mongoose.model("UrlModel");
const shortid = require("shortid");
const errorUrl = 'http://localhost/error';
const UrlControler = require('../controllers/url')
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
        const item = await UrlModel.findOne({
          originalUrl: originalUrl
        });
        if (item) {
          res.status(200).json(item);
        } else {
          shortUrl = shortBaseUrl + "/" + urlCode;
          const item = new UrlModel({
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
    return UrlControler.getShorten(req,res)
  })
};