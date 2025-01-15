const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");
const Expresserr = require("./src/utils/ExpressError");
const session = require("express-session");
const flsh = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./src/models/userSchema");
require("colors");

const TaskRoute = require("./src/Routes/taskroutes");
const RegRoutes = require("./src/Routes/regRoutes");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 3 * 24 * 60 * 60 * 1000,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);

app.use(flsh());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); // ✅ Fixed
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const MONGO_URL = "mongodb://127.0.0.1:27017/TMS";
async function mongo() {
  await mongoose.connect(MONGO_URL);
}

mongo()
  .then(() => console.log("MongoDB Connected...".green))
  .catch(() => console.log("MongoDB Connection Failed...".red));

app.use("/", TaskRoute);
app.use("/", RegRoutes);

app.all("*", (req, res, next) => {
  next(new Expresserr(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statuscode = 500, message = "Something went wrong" } = err;
  res.status(statuscode).send(message);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080".bgBlue);
});
