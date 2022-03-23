import express, { Router } from "express";
import { AuthRoutes } from "./modules/app/routes/Auth.route";
import { UserRoutes } from "./modules/app/routes/User.route"
import { ProjectRoutes } from "./modules/app/routes/Project.route";
import { TaskRoutes } from "./modules/app/routes/Task.route";
import { TimeCardRoutes } from "./modules/app/routes/TimeCard.route";

export const Routes: Router = express.Router();

Routes.use('/auth', AuthRoutes);
Routes.use('/user', UserRoutes);
Routes.use('/task', TaskRoutes);
Routes.use('/project', ProjectRoutes);
Routes.use('/timeCard', TimeCardRoutes);