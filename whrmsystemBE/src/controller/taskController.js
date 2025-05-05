import taskApiService from "../service/taskApiService";
import 'dotenv/config';

const readFunc = async (req, res) => {
    try {
        let page = req.query.page
        let limit = req.query.limit
        let data = await taskApiService.getAllTask(+page, +limit);
        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.json({
            EM: "Error from server",
            EC: "0",
            DT: ""
        })
    }
}

const readByConditionFunc = async (req, res) => {
    try {
        let page = req.query.page
        let limit = req.query.limit
        let condition = req.body.condition
        let data = await taskApiService.getTaskByCondition(+page, +limit, condition);
        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.json({
            EM: "Error from server",
            EC: "0",
            DT: ""
        })
    }
}

const createFunc = async (req, res) => {
    try {
        if (!req.body.title || !req.body.description || !req.body.endDate || !req.body.postBy) {
            return res.json({
                EM: "Lack of parameters.",
                EC: "0",
                DT: ""
            })
        }

        let reqFiles = req.files
        let reqData = {
            title: req.body.title,
            description: req.body.description,
            endDate: req.body.endDate,
            postBy: req.body.postBy
        }

        let data = await taskApiService.createTask(reqData, reqFiles)
        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.json({
            EM: "Error from server",
            EC: "0",
            DT: ""
        })
    }
}

const getDocumentFunc = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.json({
                EM: "Not found Task.",
                EC: "0",
                DT: ""
            })
        }

        let data = await taskApiService.getDocument(req.body.id);
        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.json({
            EM: "Error from server",
            EC: "0",
            DT: ""
        })
    }
}

const updateFunc = async (req, res) => {
    try {
        if (!req.body.id || !req.body.title || !req.body.description || !req.body.endDate) {
            return res.json({
                EM: "Lack of parameters.",
                EC: "0",
                DT: ""
            })
        }

        let reqFiles = req.files
        let reqData = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            endDate: req.body.endDate,
            filesToDelete: req.body.filesToDelete
        }

        let data = await taskApiService.updateTask(reqData, reqFiles)
        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.json({
            EM: "Error from server",
            EC: "0",
            DT: ""
        })
    }
}

const deleteFunc = async (req, res) => {
    try {
        let data = await taskApiService.deleteTask(req.body.id)
        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.json({
            EM: "Error from server",
            EC: "0",
            DT: ""
        })
    }
}

const readReportByManagerFunc = async (req, res) => {
    try {
        let data = await taskApiService.getAllReportByManager(req.body.TaskID);
        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.json({
            EM: "Error from server",
            EC: "0",
            DT: ""
        })
    }
}

const readReportByEmployeeFunc = async (req, res) => {
    try {
        let reqData = {
            TaskID: req.body.TaskID,
            UserID: req.body.UserID
        }

        let data = await taskApiService.getAllReportByEmployee(reqData);
        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.json({
            EM: "Error from server",
            EC: "0",
            DT: ""
        })
    }
}

const createReportFunc = async (req, res) => {
    try {
        let reqFiles = req.files
        let reqData = {
            UserID: req.body.UserID,
            TaskID: req.body.TaskID
        }

        let data = await taskApiService.createTaskReport(reqData, reqFiles)
        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.json({
            EM: "Error from server",
            EC: "0",
            DT: ""
        })
    }
}

const deleteReportFunc = async (req, res) => {
    try {
        let data = await taskApiService.deleteTaskReport(req.body.id)
        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.json({
            EM: "Error from server",
            EC: "0",
            DT: ""
        })
    }
}


module.exports = {
    readFunc, createFunc, updateFunc, getDocumentFunc, deleteFunc, readByConditionFunc,
    readReportByManagerFunc, createReportFunc, deleteReportFunc, readReportByEmployeeFunc
}