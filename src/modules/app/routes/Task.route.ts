import express, { Router } from "express";
import { createTask, getTasks } from "../controllers/Task.controllers";
import schemas from '../../../helpers/schema';
import validateData from '../../../middlewares/validation';

export const TaskRoutes: Router = express.Router();

TaskRoutes.post("/", validateData(schemas.task), createTask);
TaskRoutes.get("/", getTasks);
