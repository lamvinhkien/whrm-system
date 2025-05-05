import express from "express";
import taskController from "../controller/taskController";
import { checkUserLogin, checkUserPermission } from "../middleware/JWTAction";
import upload from "../middleware/UploadAction";
import 'dotenv/config';

const router = express.Router();

const initTaskRoutes = (app) => {
    router.get("/task/show-all", checkUserLogin, checkUserPermission, taskController.readFunc)
    router.post("/task/show-by-condition", checkUserLogin, taskController.readByConditionFunc)
    router.post("/task/get-document", checkUserLogin, taskController.getDocumentFunc)
    router.post("/task/create", checkUserLogin, checkUserPermission, upload.array('files'), taskController.createFunc)
    router.post("/task/update", checkUserLogin, checkUserPermission, upload.array('files'), taskController.updateFunc)
    router.post("/task/delete", checkUserLogin, checkUserPermission, taskController.deleteFunc)
    router.post("/task/show-all-report-by-manager", checkUserLogin, checkUserPermission, taskController.readReportByManagerFunc)
    router.post("/task/show-all-report-by-employee", checkUserLogin, taskController.readReportByEmployeeFunc)
    router.post("/task/create-report", checkUserLogin, checkUserPermission, upload.array('report'), taskController.createReportFunc)
    router.post("/task/delete-report", checkUserLogin, checkUserPermission, taskController.deleteReportFunc)
    
    return app.use("/api", router)
}

export default initTaskRoutes;