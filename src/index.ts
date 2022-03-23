import "dotenv/config";
import "reflect-metadata";

import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./utils/error.middleware";
import { Routes } from "./routes"
import passport from "passport";
import session from "express-session";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

(async () => {

  const app: Application = express();

  app.use(cors({ origin: '*' }));
  app.use(helmet());
  app.use(express.json());
  passport.serializeUser((user: Express.User, done) => done(null, user));
  passport.deserializeUser((user: Express.User, done) => done(null, user));
  app.use(session({ secret: process.env.COOKIE_SECRET!, resave: false, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  
  /* typeorm database connection */
  createConnection().then(() => {
    console.log('Connected to database!');
  }).catch(error => console.log(error));
  /* typeorm database connection END*/
  app.use(errorHandler);

  app.use("/api", Routes);

  const port = process.env.PORT || 4000;
  try { app.listen(port, () => console.log(`API server started at http://localhost:${port}`)); }
  catch (err) { console.log(err); }

})();
