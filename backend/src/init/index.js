const mongoose = require("mongoose");
const tasksample = require("./taskSample");
const Task = require("../models/taskSchema");

const MONGO_URL = "mongodb://127.0.0.1:27017/TMS";

async function mongo() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected...".bgMagenta);
}

const initDB = async () => {
  try {
    await Task.deleteMany();
    console.log("Delete many tasks...");

    await Task.insertMany(tasksample.data);
    console.log(tasksample.data);
    console.log("insert multiple listing");
  } catch (err) {
    console.log("err for inserting new data", err);
  }
};

mongo().then(() => {
  initDB();
});
