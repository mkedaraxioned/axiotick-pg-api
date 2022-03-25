import Joi from "joi";
const schemas = {
  project: Joi.object({
    billingType: Joi.string()
      .valid("BILLABLE", "NONBILLABLE")
      .label("Billing type"),
    clientName: Joi.string()
      .min(3)
      .max(30)
      .message("Clientname length must be at least 3 characters long"),
    members: Joi.array().items(Joi.number()),
    tasks: Joi.array().items(Joi.number()),
    timeBudget: Joi.number(),
    title: Joi.string().label("Project title"),
    ownerId: Joi.number().label("Owner"),
  }),
  task: Joi.object({
    billingType: Joi.string()
      .valid("BILLABLE", "NONBILLABLE")
      .label("Billing type"),
    description: Joi.string(),
    endDate: Joi.date(),
    members: Joi.array().items(Joi.number()),
    projectId: Joi.number().label("Project Id"),
    startDate: Joi.date(),
    title: Joi.string().label("Task title"),
    userId: Joi.number().label("User"),
  }),
  timecard: Joi.object({
    billingType: Joi.string()
      .valid("BILLABLE", "NONBILLABLE")
      .label("Billing type"),
    date: Joi.date().label("Timecard date"),
    logTime: Joi.string()
      .pattern(/^(\d{1,2}\.\d{1,2})|(\d{1,2}\:[0-5]?[0-9])$/,'HH:MM or decimal hours') 
      .label("Logging time"),
    notes: Joi.string(),
    projectId: Joi.number().label("Project Id"),
    taskId: Joi.number(),
    title: Joi.string().label("Timecard title"),
    userId: Joi.number().label("User"),
  }),
};
export default schemas;
