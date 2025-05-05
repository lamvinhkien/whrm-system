import db from "../models/index";
import fs from "fs-extra";
import 'dotenv/config';
const { Sequelize } = require('sequelize');
import { Op } from "sequelize";

const getAllTask = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.Task.findAndCountAll({
            offset: offset,
            limit: limit
        })
        let totalPage = Math.ceil(count / limit)
        return {
            EM: "Get task successfully!",
            EC: "1",
            DT: { task: rows, offset: offset, totalPage: totalPage }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Error from server",
            EC: "0",
            DT: "",
        };
    }
}

const getTaskByCondition = async (page, limit, condition) => {
    try {
        const now = new Date()
        let whereCondition = {}
        if (condition !== '') {
            whereCondition = { endDate: { [Op[condition]]: now } }
        }

        let offset = (page - 1) * limit
        let { count, rows } = await db.Task.findAndCountAll({
            where: whereCondition,
            offset: offset,
            limit: limit,
            order: [['id', 'DESC']]
        })
        let totalPage = Math.ceil(count / limit)
        return {
            EM: "Get task successfully!",
            EC: "1",
            DT: { task: rows, offset: offset, totalPage: totalPage }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Error from server",
            EC: "0",
            DT: "",
        };
    }
}

const createTask = async (reqData, reqImg) => {
    try {
        let task = await db.Task.create(reqData)

        let documents = reqImg.map((file) => ({
            TaskID: task.id,
            FilePath: file.filename
        }));

        await db.Task_Document.bulkCreate(documents)

        return {
            EM: "Create task successfully!",
            EC: "1",
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Error from server",
            EC: "0",
            DT: "",
        };
    }
}

const getDocument = async (id) => {
    try {
        let documents = await db.Task_Document.findAll({ where: { TaskID: id }, raw: true })

        return {
            EM: "Get documents successfully!",
            EC: "1",
            DT: documents
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Error from server",
            EC: "0",
            DT: "",
        };
    }
}

const updateTask = async (reqData, reqFiles) => {
    try {
        let task = await db.Task.findOne({ where: { id: reqData.id } })

        if (!task) {
            return {
                EM: "Not found Task!",
                EC: "0",
                DT: "",
            };
        }

        if (reqData.filesToDelete && reqData.filesToDelete !== '') {
            const filesToDeleteArray = JSON.parse(reqData.filesToDelete);
            if (filesToDeleteArray.length > 0) {
                let taskDocument = await db.Task_Document.findAll({ where: { TaskID: task.id }, raw: true })
                if (taskDocument && taskDocument.length > 0) {
                    filesToDeleteArray.forEach(async (item, index) => {
                        let deleteFile = await db.Task_Document.destroy({ where: { id: item.id } })
                        if (deleteFile) {
                            await fs.unlink('src/public/uploads/' + item.FilePath)
                        }
                    })
                }
            }
        }

        let documents = reqFiles.map((file) => ({
            TaskID: task.id,
            FilePath: file.filename
        }));

        await db.Task_Document.bulkCreate(documents)
        await task.update({ title: reqData.title, description: reqData.description, endDate: reqData.endDate })

        return {
            EM: "Update task successfully!",
            EC: "1",
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Error from server",
            EC: "0",
            DT: "",
        };
    }
}

const deleteTask = async (id) => {
    try {
        let task = await db.Task.findOne({ where: { id: id } })

        if (!task) {
            return {
                EM: "Not found Task!",
                EC: "0",
                DT: "",
            };
        }

        let taskDocument = await db.Task_Document.findAll({ where: { TaskID: task.id }, raw: true })
        if (taskDocument && taskDocument.length > 0) {
            taskDocument.forEach(async (item, index) => {
                if (item.FilePath) {
                    await fs.unlink('src/public/uploads/' + item.FilePath)
                }
            })
        }

        let taskReport = await db.Task_User_Document.findAll({ where: { TaskID: task.id }, raw: true })
        if (taskReport && taskReport.length > 0) {
            taskReport.forEach(async (item, index) => {
                if (item.FilePath) {
                    await fs.unlink('src/public/uploads/' + item.FilePath)
                }
            })
        }

        await db.Task.destroy({ where: { id: task.id } })

        return {
            EM: "Delete task successfully!",
            EC: "1",
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Error from server",
            EC: "0",
            DT: "",
        };
    }
}

const getAllReportByManager = async (id) => {
    try {
        let report = await db.Task_User_Document.findAll({
            where: { TaskID: id },
            raw: true,
            attributes: [
                'id',
                'UserID',
                'TaskID',
                'FilePath',
                'createdAt',
                'updatedAt',
                [Sequelize.col('User.email'), 'email'],
                [Sequelize.col('User.username'), 'username']
            ],
            include: [{ model: db.User, attributes: [] }]
        })

        return {
            EM: "Get report successfully!",
            EC: "1",
            DT: report
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Error from server",
            EC: "0",
            DT: "",
        };
    }
}

const getAllReportByEmployee = async (reqData) => {
    try {
        let report = await db.Task_User_Document.findAll({ where: { TaskID: reqData.TaskID, UserID: reqData.UserID }, raw: true })

        return {
            EM: "Get report successfully!",
            EC: "1",
            DT: report
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Error from server",
            EC: "0",
            DT: "",
        };
    }
}

const createTaskReport = async (reqData, reqFiles) => {
    try {
        if (reqFiles && reqFiles.length < 0) {
            return {
                EM: "Please upload document.",
                EC: "0",
                DT: "",
            };
        }

        const now = new Date()
        let task = await db.Task.findOne({ where: { id: reqData.TaskID, endDate: { [Op.gt]: now } }, attributes: ['id'], raw: true })
        if (task) {
            let reports = reqFiles.map((file) => ({
                UserID: reqData.UserID,
                TaskID: reqData.TaskID,
                FilePath: file.filename
            }));

            await db.Task_User_Document.bulkCreate(reports)

            return {
                EM: "Upload report successfully!",
                EC: "1",
                DT: "",
            };
        }
        return {
            EM: "The task is overdue.",
            EC: "0",
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Error from server",
            EC: "0",
            DT: "",
        };
    }
}

const deleteTaskReport = async (id) => {
    try {
        let report = await db.Task_User_Document.findOne({ where: { id: id }, raw: true })

        if (!report) {
            return {
                EM: "Not found report!",
                EC: "0",
                DT: "",
            };
        }

        await fs.unlink('src/public/uploads/' + report.FilePath)

        await db.Task_User_Document.destroy({ where: { id: id } })

        return {
            EM: "Delete report successfully!",
            EC: "1",
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Error from server",
            EC: "0",
            DT: "",
        };
    }
}

module.exports = {
    getAllTask, createTask, updateTask, getDocument, deleteTask, getTaskByCondition,
    getAllReportByManager, createTaskReport, getAllReportByEmployee, deleteTaskReport
}