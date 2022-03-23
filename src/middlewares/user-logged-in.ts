import { NextFunction, Request, Response } from "express";

export const isUserLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.isAuthenticated()
    ? next()
    : res.status(401).send({ success: false, error: "Unauthorised!" });
};
