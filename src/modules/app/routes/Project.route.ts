import express, { Router } from "express";
import { createProject, getProjects } from "../controllers/Project.controller";

export const ProjectRoutes: Router = express.Router();

ProjectRoutes.post("/", createProject);
ProjectRoutes.get("/", getProjects);
