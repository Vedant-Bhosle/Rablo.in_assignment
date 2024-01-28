require("dotenv").config();
const { urlencoded } = require("express");
const express = require("express");

const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const { reset } = require("nodemon");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
require("./db/conn");
const User = require("./models/registers");
const Product = require("./models/product");
var cors = require("cors");
const port = process.env.PORT || 5001;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.options("*", cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
// app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((elem) => {
      return elem.token !== req.token;
    });

    res.clearCookie("jwt");
    // console.log("Logout Succesfully");
    await req.user.save();
    res.status(200).json("you are logged out succesfully");
  } catch (err) {
    res
      .status(500)
      .json({ errormsg: "Something went wrong.Please refresh the site." });
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await User.findOne({ email: email });
    // hash check
    const isMatch = await bcrypt.compare(password, useremail.password);
    // console.log(isMatch);
    const token = await useremail.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    });

    if (isMatch) {
      req.user = useremail;
      console.log("you are logged in successfully");
      res.status(201).json({ message: "you are logged in succesfully" });
    } else {
      res.status(400).message({
        alert: "Invalid Credentials !",
      });
    }
  } catch (err) {
    res.status(400).json({
      alert: "Invalid Credentials !",
    });
  }
});
///secret page

app.post("/register", async (req, res) => {
  try {
    const registerUser = new User({
      email: req.body.email,

      password: req.body.password,
    });
    //create token
    const token = await registerUser.generateAuthToken();

    const registered = await registerUser.save();

    res.status(201).json({ message: "You Are Registered Succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errormsg:
        "Something went wrong,or likely data you will inserting is alredy present",
    });
  }
});

app.get("/authcheck", auth, (req, res) => {
  console.log("we are authenticated page");
  res.status(200).json(req.user);
});

//product routes

app.post("/createproduct", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
});

app.get("/getproducts", auth, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

//update product
app.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.updateOne(
      { productId: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      console.log(product);
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.id });
    await product.remove();
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/products/featured", async (req, res) => {
  try {
    const products = await Product.find({ featured: true });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});
//product less than mention price
app.get("/products/price/:value", async (req, res) => {
  try {
    const products = await Product.find({ price: { $lt: req.params.value } });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});
//product greater than given rating

app.get("/products/rating/:value", async (req, res) => {
  try {
    const products = await Product.find({ rating: { $gt: req.params.value } });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log("server running on port 5001");
});
