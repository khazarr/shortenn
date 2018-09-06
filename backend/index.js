const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost/url-shortner";
const connectOptions = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true
};
//Connect to MongoDB 
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
  if (err) console.log(`Error`, err);
  console.log(`Connected to MongoDB`);
});
const app = express();
app.use(bodyParser.json());
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});