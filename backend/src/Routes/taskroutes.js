const express = require("express");
const router = express.Router();
const Task = require("../models/taskSchema");
const WrapAsync = require("../utils/WrapAsync");
const Expresserror = require("../utils/ExpressError");
const { TaskSchema } = require("../Schema/taskSchema");

const ValidateTasks = (req, res, next) => {
  let { error } = TaskSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details.map((err) => err.message),
    });
  } else {
    next();
  }
};

router.get(
  "/",
  WrapAsync(async (req, res) => {
    const allTasks = await Task.find({});
    res.send(allTasks);
  })
);

router.post(
  "/",
  ValidateTasks,
  WrapAsync(async (req, res) => {
    const newTask = await new Task(req.body);
    await newTask.save();
    req.flash("success", "new added");
    res.status(201).json(newTask);
  })
);

router.delete(
  "/:id",
  WrapAsync(async (req, res) => {
    const { id } = req.params;
    const data = await Task.findByIdAndDelete(id);

    res.status(200).json({ message: "Deleted successfully" }); // Send success response
  })
);

router.get(
  "/:id/edit",
  WrapAsync(async (req, res) => {
    const { id } = req.params;
    const taskdata = await Task.findById(id);
    res.send(taskdata);
  })
);

router.put(
  "/:id",
  WrapAsync(async (req, res) => {
    if (!req.body.Task) {
      throw new Expresserror(400, "send valid data for add Task!");
    }
    const { id } = req.params;
    const updatedData = await Task.findByIdAndUpdate(id, req.body, {
      new: true, // Returns the updated document
    });
    res.status(200).json({ message: "Menu updated successfully!" });
  })
);

module.exports = router;
