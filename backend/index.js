const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost/url-shortner";
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
app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});
require("./routes/urlshorten")(app);
