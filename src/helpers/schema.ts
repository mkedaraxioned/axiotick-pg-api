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
};
export default schemas;
