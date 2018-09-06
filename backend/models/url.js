const mongoose = require("mongoose");
const {
  Schema
} = mongoose;
const urlModelSchema = new Schema({
  originalUrl: String,
  urlCode: String,
  shortUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
mongoose.model("UrlModel", urlModelSchema);