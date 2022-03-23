import express, { Router } from "express";
import passport from "passport";
import("../../../helpers/passport");

export const AuthRoutes: Router = express.Router();

// auth/google
AuthRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
AuthRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/user/login",
    failureRedirect: "/api/auth/google/failure",
  })
);

AuthRoutes.get("/google/failure", (req, res) => {
  // redirect to login page
  return res.status(401).send({
    success: false,
    error: "Unauthorised!",
  });
});
