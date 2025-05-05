import express from "express";
import passport from "passport";
import apiController from "../controller/apiController";
import { checkUserLogin } from "../middleware/JWTAction";
import 'dotenv/config';

const router = express.Router();

const initApiRoutes = (app) => {
    // Login, Logout, Register
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)
    router.post("/logout", checkUserLogin, apiController.handleLogout)

    // Google
    router.get("/login/google", passport.authenticate('google'))
    router.get('/oauth2/redirect/google', passport.authenticate('google', {
        failureRedirect: process.env.REACT_URL + '/login'
    }), (req, res) => {
        res.cookie("at_user", req.user.access_token, { httpOnly: true, maxAge: process.env.EXPIRES_IN_COOKIES })
        res.cookie("rt_user", req.user.refresh_token, { httpOnly: true, maxAge: process.env.EXPIRES_IN_COOKIES })
        res.redirect(process.env.REACT_URL)
    });

    // Facebook
    router.get("/login/facebook", passport.authenticate('facebook'))
    router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
        failureRedirect: process.env.REACT_URL + '/login'
    }), (req, res) => {
        res.cookie("at_user", req.user.access_token, { httpOnly: true, maxAge: process.env.EXPIRES_IN_COOKIES })
        res.cookie("rt_user", req.user.refresh_token, { httpOnly: true, maxAge: process.env.EXPIRES_IN_COOKIES })
        res.redirect(process.env.REACT_URL)
    });

    // Forgot password
    router.post('/send-otp', apiController.handleForgotPassword)
    router.post('/reset-password', apiController.handleResetPassword)

    return app.use("/api", router)
}

export default initApiRoutes;