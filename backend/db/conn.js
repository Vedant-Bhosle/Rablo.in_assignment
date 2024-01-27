const mongoose = require("mongoose");
const mongoURI = process.env.MOGOURI;

//this is local database after test we have to add atlas
mongoose
  .connect("mongodb://127.0.0.1/rablo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connectio is succesful");
  })
  .catch((e) => {
    console.log(e);
    console.log("NO connection");
  });
