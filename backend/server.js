const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./src/models/taskSchema");
const methodOverride = require("method-override");
const Expresserr = require("./src/utils/ExpressError");
const corsoptions = {
  origin: ["http://localhost:5173"],
};
require("colors");

const TaskRoute = require("./src/Routes/taskroutes");
const RegRoutes = require("./src/Routes/regRoutes");

app.use(methodOverride("_method"));

const MONGO_URL = "mongodb://127.0.0.1:27017/TMS";
mongo()
  .then(() => {
    console.log("MongoDB Connected...".green);
  })
  .catch(() => {
    console.log("MongoDB Connection Failed...".red);
  });
async function mongo() {
  await mongoose.connect(MONGO_URL);
}

app.use(cors(corsoptions));
app.use(express.json());

app.use("/", TaskRoute);
app.use("/", RegRoutes);

app.all("*", (req, res, next) => {
  next(new Expresserr(404, "page not found !!!!!"));
});

app.use((err, req, res, next) => {
  let { statuscode = 500, message = "someting went wrong" } = err;
  res.status(statuscode).send(message);
  // res.send("something went wrong!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080".bgBlue);
});
