import express from "express";
import groupController from "../controller/groupController";
import { checkUserLogin, checkUserPermission } from "../middleware/JWTAction";
import 'dotenv/config';

const router = express.Router();

const initGroupRoutes = (app) => {
    router.get("/group/show-all", checkUserLogin, groupController.readFunc)
    router.get("/group/show-all-for-assign", checkUserLogin, checkUserPermission, groupController.readByAdminFunc)
    router.get("/group/show-all-with-pagination", checkUserLogin, checkUserPermission, groupController.readFuncWithPage)
    router.post("/group/get-group-with-roles", checkUserLogin, checkUserPermission, groupController.readFuncWithRoles)
    router.post("/group/assign-role-for-group", checkUserLogin, checkUserPermission, groupController.assignRoleForGroup)
    router.post("/group/create", checkUserLogin, checkUserPermission, groupController.createFunc)
    router.put("/group/update", checkUserLogin, checkUserPermission, groupController.updateFunc)
    router.delete("/group/delete", checkUserLogin, checkUserPermission, groupController.deleteFunc)

    return app.use("/api", router)
}

export default initGroupRoutes;