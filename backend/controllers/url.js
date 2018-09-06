const mongoose = require("mongoose");
const UrlModel = mongoose.model("UrlModel");
const errorUrl = 'http://localhost/error';

module.exports = {
  getShorten: async (req, res) => {
    console.log('wjezdzam tu')
      const urlCode = req.params.shortenUrl;
      const item = await UrlModel.findOne({
        urlCode: urlCode
      });
      console.log('item', item)
      if (item) {
        return res.redirect(item.originalUrl);
      } else {
        return res.status(400).json('ni ma tego w bazie');
      }
  }
}