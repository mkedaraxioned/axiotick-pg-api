import express, { Router } from "express";
import { createTask, getTasks } from "../controllers/Task.controllers";

export const TaskRoutes: Router = express.Router();

TaskRoutes.post("/", createTask);
TaskRoutes.get("/", getTasks);
