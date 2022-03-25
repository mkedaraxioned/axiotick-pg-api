import express, { Router } from "express";
import {
  createTimeCard,
  getTimeCard,
} from "../controllers/TimeCard.controller";
import schemas from '../../../helpers/schema';
import validateData from '../../../middlewares/validation';

export const TimeCardRoutes: Router = express.Router();

TimeCardRoutes.post("/",validateData(schemas.timecard) , createTimeCard);
TimeCardRoutes.get("/", getTimeCard);
