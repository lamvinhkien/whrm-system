import db from "../models/index";

const getGroupRoles = async (user) => {
    let scope = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ["id", "name", "description"],
        include: { model: db.Role, attributes: ["id", "url", "description"], through: { attributes: [] } }
    })

    return scope
}

module.exports = {
    getGroupRoles
}