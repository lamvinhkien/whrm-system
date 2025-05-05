import userApiService from "../service/userApiService";
import 'dotenv/config';

const readFunc = async (req, res) => {
    try {
        let page = req.query.page
        let limit = req.query.limit
        let users = await userApiService.getUserWithPagination(+page, +limit)

        if (users) {
            return res.json({
                EM: "Get users successfully!",
                EC: "1",
                DT: users
            })
        } else {
            return res.json({
                EM: "Users not exist",
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

const createFunc = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.username || !req.body.password || !req.body.dateOfBirth || !req.body.gender) {
            return res.json({
                EM: "Lack of parameters",
                EC: "0",
            })
        }

        let regEmail = /\S+@\S+\.\S+/;
        let validateEmail = regEmail.test(req.body.email)
        if (!validateEmail) {
            return res.json({
                EM: "Email is invalid!",
                EC: "0",
                DT: "email"
            })
        }

        let regPhone = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
        let validatePhone = regPhone.test(req.body.phone)
        if (!validatePhone) {
            return res.json({
                EM: "Phone is invalid!",
                EC: "0",
                DT: "phone"
            })
        }

        let regName = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ'\s]*$/;
        let validateName = regName.test(req.body.username)
        if (!validateName) {
            return res.json({
                EM: "Username is invalid!",
                EC: "0",
                DT: "username"
            })
        }

        if (req.body.password && req.body.password.length < 6) {
            return res.json({
                EM: "Password length must be at lastest 6 character!",
                EC: "0",
                DT: "password"
            })
        }

        let data = await userApiService.createNewUser(req.body)
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

const updateFunc = async (req, res) => {
    try {
        if (!req.body.groupId) {
            return res.json({
                EM: "Please enter group.",
                EC: "0",
                DT: "group"
            })
        }

        let data = await userApiService.updateUser(req.body)
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
        let data = await userApiService.deleteUser(req.body.id)
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

const getUserAccount = async (req, res) => {
    let token = req.accessToken
    let data = req.dataToken

    if (data) {
        if (token) {
            res.cookie("at_user", token, { httpOnly: true, maxAge: process.env.EXPIRES_IN_COOKIES })
        }

        return res.json({
            EC: "1",
            EM: "Get User Account Successfully!",
            DT: data
        })
    } else {
        return res.json({
            EC: "0",
            EM: "User are not authenticated. Please login!",
            DT: ""
        })
    }
}

const changeInfor = async (req, res) => {
    try {
        let regEmail = /\S+@\S+\.\S+/;
        let validateEmail = regEmail.test(req.body.changeData.email)
        if (!validateEmail && req.body.typeAccount === 'LOCAL') {
            return res.json({
                EM: "Email is invalid!",
                EC: "0",
                DT: "email"
            })
        }

        if (!req.body.changeData.dateOfBirth) {
            return res.json({
                EM: "Date of birth is required!",
                EC: "0",
                DT: "dateOfBirth"
            })
        }

        if (req.body.changeData.phone) {
            let regPhone = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
            let validatePhone = regPhone.test(req.body.changeData.phone)
            if (!validatePhone) {
                return res.json({
                    EM: "Phone is invalid!",
                    EC: "0",
                    DT: "phone"
                })
            }
        }

        let regName = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ'\s]*$/;
        let validateName = regName.test(req.body.changeData.username)
        if (!validateName) {
            return res.json({
                EM: "Username is invalid!",
                EC: "0",
                DT: "username"
            })
        }

        let data = await userApiService.changeInfor(req.body)

        if (data.EC === '1') {
            res.cookie("at_user", data.DT.access_token, { httpOnly: true, maxAge: process.env.EXPIRES_IN_COOKIES })
            res.cookie("rt_user", data.DT.refresh_token, { httpOnly: true, maxAge: process.env.EXPIRES_IN_COOKIES })
        }

        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.json({
            EC: "0",
            EM: "Error from server",
            DT: ""
        })
    }
}

const changeAvatar = async (req, res) => {
    try {
        let data = await userApiService.changeAvatar(req.body, req.files[0])
        if (data.EC === '1') {
            res.cookie("at_user", data.DT.access_token, { httpOnly: true, maxAge: process.env.EXPIRES_IN_COOKIES })
            res.cookie("rt_user", data.DT.refresh_token, { httpOnly: true, maxAge: process.env.EXPIRES_IN_COOKIES })
        }

        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.json({
            EC: "0",
            EM: "Error from server",
            DT: ""
        })
    }
}

const removeAvatar = async (req, res) => {
    try {
        let data = await userApiService.removeAvatar(req.body)
        if (data.EC === '1') {
            res.cookie("at_user", data.DT.access_token, { httpOnly: true, maxAge: process.env.EXPIRES_IN_COOKIES })
            res.cookie("rt_user", data.DT.refresh_token, { httpOnly: true, maxAge: process.env.EXPIRES_IN_COOKIES })
        }

        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.json({
            EC: "0",
            EM: "Error from server",
            DT: ""
        })
    }
}

const changePassword = async (req, res) => {
    try {
        let data = await userApiService.changePassword(req.body)

        if (data.EC === '1') {
            res.clearCookie("at_user");
            res.clearCookie("rt_user");
        }

        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.json({
            EC: "0",
            EM: "Error from server",
            DT: ""
        })
    }
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc, getUserAccount, changeInfor, changePassword, changeAvatar, removeAvatar
}