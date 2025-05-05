import db from "../models/index";

const getRole = async () => {
    try {
        let roles = await db.Role.findAll({
            attributes: ['id', 'url', 'description'],
            order: [["description", "ASC"]],
        })

        if (roles) {
            return roles
        } else {
            return {
                EM: "Error from server",
                EC: "0",
                DT: []
            }
        }

    } catch (error) {
        console.log(error)
        return {
            EM: "Error from server",
            EC: "0",
            DT: []
        }
    }
}

const getRoleWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.Role.findAndCountAll({
            attributes: ["id", "url", "description"],
            offset: offset,
            limit: limit,
            order: [["description", "ASC"]],
        })
        let totalPage = Math.ceil(count / limit) // lam tron len

        return {
            page: page,
            totalPage: totalPage,
            offset: offset,
            roles: rows
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error from server",
            EC: "0",
            DT: []
        }
    }
}

const updateRole = async (data) => {
    try {
        let role = await db.Role.findOne({
            where: { id: data.id }
        })

        if (role) {
            await role.update({
                description: data.description
            })

            return {
                EM: "Update role successfully!",
                EC: "1",
                DT: role
            }
        } else {
            return {
                EM: "Role not exist.",
                EC: "0",
                DT: {}
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error from server",
            EC: "0",
            DT: []
        }
    }
}

module.exports = {
    getRoleWithPagination, updateRole, getRole
}