import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
const validateData = (schema: ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const { error } = schema.validate(data);
    if (error) {
      const { details } = error;
      const message = details.map((i: { message: any }) => i.message).join(",");
      return res.status(400).send({ success: false, error: message });
    }
    next();
  };
};

export default validateData;
