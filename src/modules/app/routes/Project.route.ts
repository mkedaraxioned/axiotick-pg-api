import express, { Router } from "express";
import { createProject, getProjects } from "../controllers/Project.controller";
import schemas from '../../../helpers/schema';
import validateData from '../../../middlewares/validation';

export const ProjectRoutes: Router = express.Router();

ProjectRoutes.post("/", validateData(schemas.project) , createProject);
ProjectRoutes.get("/", getProjects);
