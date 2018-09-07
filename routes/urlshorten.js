const UrlControler = require('../controllers/url')
const path = require('path')
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
  app.get("/", (req, res) => {
    // return res.sendFile(path.join(__dirname, '../view/index.html'))
    return res.render(path.join(__dirname, '../view/index'), {
      port: process.env.PORT || '7000'
    })

  })
};