const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/url-shortner";
const path = require('path');
const PORT = process.env.port || 7000;
const app = express();



//Connect to MongoDB 
  const connectOptions = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true
  };
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
  if (err) console.log(`Error`, err);
  console.log(`Connected to MongoDB`);
});


require('./models/url')
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});
require("./routes/urlshorten")(app);
