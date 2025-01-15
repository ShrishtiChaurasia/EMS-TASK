const joi = require("joi");

const TaskSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  status: joi.string().valid("Pending", "In Progress", "Completed").required(),
  priority: joi.string().valid("Low", "Medium", "High").required(),
  dueDate: joi.date().iso(),
  createdAt: joi
    .date()
    .iso()
    .default(() => new Date()),
});

module.exports = { TaskSchema };
