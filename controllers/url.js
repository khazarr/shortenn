const mongoose = require("mongoose");
const UrlModel = mongoose.model("UrlModel");
const errorUrl = 'http://localhost/error';
const validUrl = require("valid-url");
const shortid = require("shortid");

module.exports = {
  getShortenUrl: async (req, res) => {
      const urlCode = req.params.shortenUrl;
      if (urlCode === 'favicon.ico') {
        return;
      }
      const item = await UrlModel.findOne({
        urlCode: urlCode
      });
      console.log('item', item)
      if (item) {
        return res.redirect(item.originalUrl);
      } else {
        return res.status(400).json('ni ma tego w bazie');
      }
    },
    postShortenUrl: async (req, res) => {
      const {
        originalUrl,
        shortBaseUrl
      } = req.body;
      const urlCode = shortid.generate();
      const updatedAt = new Date();
      const validation = helpers.validateParameters(originalUrl, shortBaseUrl)
      if (!validation.status) {
        return res
          .status(400)
          .json({
            msg: "Bad parameters",
            err: validation
          })
      } else {
        try {
          const item = await UrlModel.findOne({
            originalUrl: originalUrl
          });
          if (item) {
            res.status(200).json(item)
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
        } catch (error) {
          res.status(500).json({
            msg: "Database problem ;(",
            error
          })
        }
      }
    }
}

const helpers = {
  validateParameters(url, base) {
    const urlValid = !!validUrl.isWebUri(url)
    const baseValid = !!validUrl.isUri(base)
    return {
      status: urlValid && baseValid,
      urlValid,
      baseValid
    }
  }
}