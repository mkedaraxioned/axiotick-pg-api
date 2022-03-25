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
    title: Joi.string().required().label("Project title"),
    ownerId: Joi.number().required().label("Owner"),
  }),
  task: Joi.object({
    billingType: Joi.string()
      .valid("BILLABLE", "NONBILLABLE")
      .label("Billing type"),
    description: Joi.string(),
    endDate: Joi.date(),
    members: Joi.array().items(Joi.number()),
    projectId: Joi.number().required().label("Project Id"),
    startDate: Joi.date(),
    title: Joi.string().required().label("Task title"),
    userId: Joi.number().label("User"),
  }),
};
export default schemas;
