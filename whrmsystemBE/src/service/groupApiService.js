import db from "../models/index";
import { getGroupRoles } from "./JWTService";
import { createAccessToken } from "../middleware/JWTAction";
import { Op } from "sequelize";

const getAllGroup = async () => {
    try {
        let group = await db.Group.findAll({
            where: { name: { [Op.ne]: 'Admin' } },
            order: [
                ["name", "DESC"]
            ]
        })

        return {
            EM: "Get group successfully!",
            EC: "1",
            DT: group
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error from server",
            EC: "0",
            DT: ""
        }
    }
}

const getAllGroupByAdmin = async () => {
    try {
        let group = await db.Group.findAll({
            where: { name: { [Op.ne]: 'None' } },
            order: [
                ["name", "ASC"]
            ]
        })

        return {
            EM: "Get group successfully!",
            EC: "1",
            DT: group
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error from server",
            EC: "0",
            DT: ""
        }
    }
}

const getGroupWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.Group.findAndCountAll({
            where: { name: { [Op.notIn]: ['Admin', 'None'] } },
            attributes: ["id", "name", "description"],
            offset: offset,
            limit: limit,
            order: [["name", "ASC"]],
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

const getGroupWithRoles = async (id) => {
    try {
        let group = await db.Group.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'description'],
            include: { model: db.Role, attributes: ['id', 'url', 'description'], through: { attributes: [] } }
        })

        if (group) {
            return {
                EM: "Get group with roles successfully!",
                EC: "1",
                DT: group
            }
        } else {
            return {
                EM: "Group not exist",
                EC: "0",
                DT: {}
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error from server",
            EC: "0",
            DT: {}
        }
    }
}

const assignRoleForGroup = async (data) => {
    try {
        const { groupId, roles } = data;

        const existingRoles = await db.Group_Role.findAll({
            where: { groupId },
            attributes: ['roleId'],
            raw: true,
        });

        const existingRoleIds = existingRoles.map(role => role.roleId);
        const newRoleIds = roles.map(role => role.roleId);

        const rolesToAdd = roles.filter(role => !existingRoleIds.includes(role.roleId));

        const rolesToRemove = existingRoles.filter(role => !newRoleIds.includes(role.roleId));

        if (rolesToRemove.length > 0) {
            await db.Group_Role.destroy({
                where: {
                    groupId,
                    roleId: rolesToRemove.map(role => role.roleId),
                },
            });
        }

        if (rolesToAdd.length > 0) {
            await db.Group_Role.bulkCreate(rolesToAdd);
        }

        let scope = await getGroupRoles(data.user)

        let payload = {
            id: data.user.id,
            avatar: data.user.avatar ? data.user.avatar : '',
            gender: data.user.gender ? data.user.gender : '',
            dateOfBirth: data.user.dateOfBirth ? data.user.dateOfBirth : '',
            address: data.user.address ? data.user.address : '',
            email: data.user.email ? data.user.email : '',
            username: data.user.username,
            phone: data.user.phone ? data.user.phone : '',
            typeAccount: data.user.typeAccount,
            data: scope,
        }

        let token = await createAccessToken(payload)

        return {
            EM: "Assign role for group successfully!",
            EC: "1",
            DT: {
                access_token: token,
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error from server",
            EC: "0",
            DT: {}
        }
    }
}

const createGroups = async (groups) => {
    try {
        let currentGroups = await db.Group.findAll({
            attributes: ['name', 'description'],
            raw: true
        })

        let compareGroups = groups.filter(({ name: name1 }) => !currentGroups.some(({ name: name2 }) => name2 === name1));

        if (compareGroups.length === 0) {
            return {
                EM: "The group you created is already available.",
                EC: "0",
                DT: []
            }
        }

        let result = await db.Group.bulkCreate(compareGroups)
        let message = result.length > 1 ? `${result.length} groups` : `${result.length} group`
        return {
            EM: `Create ${message} successfully!`,
            EC: "1",
            DT: result
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error from server",
            EC: "0",
            DT: {}
        }
    }
}

const deleteGroup = async (id) => {
    try {
        let group = await db.Group.findOne({
            where: { id: id }
        })

        if (group) {
            await db.Group.destroy({
                where: { id: group.id }
            })

            return {
                EM: "Delete group successfully!",
                EC: "1",
                DT: []
            }
        } else {
            return {
                EM: "Role not exist",
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

const checkNameExist = async (name) => {
    let check = true
    let currentName = await db.Group.findAll({
        attributes: ['name'],
        raw: true
    })

    currentName.find((item) => {
        if (item.name === name) {
            check = false
        }
    })

    return check
}

const updateGroup = async (data) => {
    try {
        let group = await db.Group.findOne({
            where: { id: data.id }
        })


        if (group) {
            let check = await checkNameExist(data.name)

            if (check || data.name === group.name) {
                await group.update({
                    name: data.name,
                    description: data.description
                })

                return {
                    EM: "Update group successfully!",
                    EC: "1",
                    DT: group
                }
            } else {
                return {
                    EM: "Name exist.",
                    EC: "0",
                    DT: {}
                }
            }
        } else {
            return {
                EM: "Group not exist.",
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
    getAllGroup, getGroupWithRoles, assignRoleForGroup, createGroups, deleteGroup, updateGroup,
    getAllGroupByAdmin, getGroupWithPagination
}