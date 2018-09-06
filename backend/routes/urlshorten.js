const UrlControler = require('../controllers/url')
module.exports = app => {
  app.post("/", async (req, res) => {
    return UrlControler.postShortenUrl(req, res)
  });
  app.get('/getAllUrls', (req, res) => {
    return res.status(200).json('TO DO >.<')
  })
  app.get("/:shortenUrl", async (req, res) => {
    return UrlControler.getShortenUrl(req, res)
  })
};