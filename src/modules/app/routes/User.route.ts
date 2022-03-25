import express, { Router } from "express";
import { isUserLoggedIn } from "../../../middlewares/user-logged-in";
import {
  getProfile,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/User.controller";
import schemas from '../../../helpers/schema';
import validateData from '../../../middlewares/validation';

export const UserRoutes: Router = express.Router();

UserRoutes.get("/protected", isUserLoggedIn, getProfile);

UserRoutes.get("/login", isUserLoggedIn, loginUser);

UserRoutes.get("/logout", logoutUser);

UserRoutes.patch("/:id", validateData(schemas.user) , updateUser);
