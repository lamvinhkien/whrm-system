import express from "express";
import userController from "../controller/userController";
import { checkUserLogin, checkUserPermission } from "../middleware/JWTAction";
import upload from "../middleware/AvatarUpload";
import 'dotenv/config';

const router = express.Router();

const initUserRoutes = (app) => {
    router.get("/user/show-all", checkUserLogin, checkUserPermission, userController.readFunc)
    router.post("/user/create", checkUserLogin, checkUserPermission, userController.createFunc)
    router.put("/user/update", checkUserLogin, checkUserPermission, userController.updateFunc)
    router.delete("/user/delete", checkUserLogin, checkUserPermission, userController.deleteFunc)
    router.get("/user/get-account", checkUserLogin, userController.getUserAccount)
    router.post("/user/change-infor", checkUserLogin, userController.changeInfor)
    router.post(
        "/user/change-avatar",
        checkUserLogin,
        (req, res, next) => {
            upload.array('avatar')(req, res, function (err) {
                if (err) {
                    return res.json({ EC: '0', EM: err.message, DT: '' });
                }
                if (!req.files || req.files.length === 0) {
                    return res.json({ EC: '0', EM: "Please upload image file!", DT: '' });
                }
                next()
            });
        },
        userController.changeAvatar
    );
    router.post("/user/remove-avatar", checkUserLogin, userController.removeAvatar)
    router.post("/user/change-password", checkUserLogin, userController.changePassword)

    return app.use("/api", router)
}

export default initUserRoutes;