import express, { Router } from "express";
import {
  createTimeCard,
  getTimeCard,
} from "../controllers/TimeCard.controller";

export const TimeCardRoutes: Router = express.Router();

TimeCardRoutes.post("/", createTimeCard);
TimeCardRoutes.get("/", getTimeCard);
