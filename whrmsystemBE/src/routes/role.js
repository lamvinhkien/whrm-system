import express from "express";
import roleController from "../controller/roleController";
import { checkUserLogin, checkUserPermission } from "../middleware/JWTAction";
import 'dotenv/config';

const router = express.Router();

const initRoleRoutes = (app) => {
    router.get("/role/show-all-for-assign", checkUserLogin, checkUserPermission, roleController.readFuncWithoutPage)
    router.get("/role/show-all", checkUserLogin, checkUserPermission, roleController.readFunc)
    router.put("/role/update", checkUserLogin, checkUserPermission, roleController.updateFunc)
   
    return app.use("/api", router)
}

export default initRoleRoutes;