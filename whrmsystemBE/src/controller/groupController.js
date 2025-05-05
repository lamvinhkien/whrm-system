import groupApiService from "../service/groupApiService";
import 'dotenv/config';

const readFunc = async (req, res) => {
    try {
        let data = await groupApiService.getAllGroup()
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

const readByAdminFunc = async (req, res) => {
    try {
        let data = await groupApiService.getAllGroupByAdmin()
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

const readFuncWithPage = async (req, res) => {
    try {
        let page = req.query.page
        let limit = req.query.limit
        let groups = await groupApiService.getGroupWithPagination(+page, +limit)

        if (groups) {
            return res.json({
                EM: "Get groups successfully!",
                EC: "1",
                DT: groups
            })
        } else {
            return res.json({
                EM: "Role not exist",
                EC: "0",
                DT: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            EM: "Error from server",
            EC: "0",
            DT: ""
        })
    }
}

const readFuncWithRoles = async (req, res) => {
    try {
        let data = await groupApiService.getGroupWithRoles(req.body.id)
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

const assignRoleForGroup = async (req, res) => {
    try {
        let data = await groupApiService.assignRoleForGroup(req.body)

        if (data.EC === '1') {
            res.cookie("at_user", data.DT.access_token, { httpOnly: true, maxAge: process.env.EXPIRES_IN_COOKIES })
        }

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
        let data = await groupApiService.createGroups(req.body)
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
        if (!req.body.name) {
            return res.json({
                EM: 'Please enter name.',
                EC: "0",
                DT: {}
            })
        }

        if (!req.body.id) {
            return res.json({
                EM: 'This group not founded.',
                EC: "0",
                DT: {}
            })
        }

        let data = await groupApiService.updateGroup(req.body)
        if (data) {
            return res.json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
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
        let data = await groupApiService.deleteGroup(req.body.id)
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
    readFunc, readFuncWithRoles, assignRoleForGroup, createFunc, updateFunc, deleteFunc,
    readByAdminFunc, readFuncWithPage
}