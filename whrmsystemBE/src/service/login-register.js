import db from "../models/index";
import bcrypt from 'bcryptjs';
import Op from "sequelize/lib/operators";
import { getGroupRoles } from "./JWTService";
import { createAccessToken, createRefreshToken } from "../middleware/JWTAction";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmail = async (email, type) => {
    let check = await db.User.findOne({ where: { [Op.and]: [{ email: email }, { typeAccount: type }] } })
    if (check) {
        return true
    }
    return false
}

const checkPhone = async (phone) => {
    let check = await db.User.findOne({ where: { phone: phone } })
    if (check) {
        return true
    }
    return false
}

const checkPassword = async (inputPassword, hashPassword) => {
    let res = await bcrypt.compare(inputPassword, hashPassword);
    return res;
}

const handleRegisterUser = async (user) => {
    try {
        let isExistEmail = await checkEmail(user.email, 'LOCAL')
        if (isExistEmail === true) {
            return {
                EM: "Email is exist!",
                EC: "0",
                DT: "email"
            }
        }

        let isExistPhone = await checkPhone(user.phone)
        if (isExistPhone === true) {
            return {
                EM: "Phone is exist!",
                EC: "0",
                DT: "phone"
            }
        }

        await db.User.create({
            email: user.email,
            phone: user.phone,
            username: user.username,
            gender: user.gender,
            address: '',
            avatar: '',
            dateOfBirth: user.dateOfBirth,
            password: hashUserPassword(user.password),
            groupId: 2,
            typeAccount: 'LOCAL',
            wrongLogin: 0,
            expiresLock: 0
        })

        return {
            EM: "Register successfully!",
            EC: "1"
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error user register from server",
            EC: "0"
        }
    }

}

const handleLoginUser = async (valueLogin, password) => {
    try {
        let userData = await db.User.findOne({
            where: {
                [Op.and]: [
                    { [Op.or]: [{ email: valueLogin }, { phone: valueLogin }] },
                    { typeAccount: 'LOCAL' }
                ]
            }
        })

        if (!userData) {
            return {
                EM: "Your Email/Phone number is incorrect, Please try again!",
                EC: "0",
                DT: "email"
            }
        } else {
            let maxWrongPw = 4
            let wrongLogin = +userData.wrongLogin
            let expiresLock = +userData.expiresLock
            let now = Date.now()
            let isCorrectPassword = await checkPassword(password, userData.password)

            if (expiresLock > now) {
                return {
                    EM: "Your account has been locked in 1 minute, please login again later!",
                    EC: "0",
                    DT: ""
                }
            }

            if (!isCorrectPassword) {
                if (wrongLogin === maxWrongPw) {
                    await userData.update({ wrongLogin: 0, expiresLock: now + 60000 })
                    return {
                        EM: "Multiple incorrect login attempts, your account has been locked.",
                        EC: "0",
                        DT: ""
                    }
                }

                await userData.update({ wrongLogin: wrongLogin + 1 })
                return {
                    EM: "Password is incorrect, Please try again!",
                    EC: "0",
                    DT: "password"
                }
            } else {
                await userData.update({ wrongLogin: 0, expiresLock: 0 })

                let scope = await getGroupRoles(userData)

                let payload = {
                    id: userData.id,
                    email: userData.email,
                    username: userData.username,
                    gender: userData.gender,
                    address: userData.address,
                    avatar: userData.avatar,
                    dateOfBirth: userData.dateOfBirth,
                    phone: userData.phone,
                    typeAccount: userData.typeAccount,
                    data: scope,
                }

                let accessToken = await createAccessToken(payload)
                let refreshToken = await createRefreshToken(payload)

                await userData.update({
                    refreshToken: refreshToken
                })

                return {
                    EM: "Login successfully!",
                    EC: "1",
                    DT: {
                        id: userData.id,
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        data: scope,
                        email: userData.email,
                        phone: userData.phone,
                        username: userData.username,
                        gender: userData.gender,
                        address: userData.address,
                        avatar: userData.avatar,
                        dateOfBirth: userData.dateOfBirth,
                        typeAccount: userData.typeAccount,
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error user login from server",
            EC: "0",
            DT: ""
        }
    }

}

const handleLoginGoogle = async (dataRaw) => {
    try {
        let user = await db.User.findOne({
            where: { idGoogle: dataRaw.idGoogle, typeAccount: 'GOOGLE' },
            raw: true
        })

        if (!user) {
            user = await db.User.create({
                idGoogle: dataRaw.idGoogle,
                username: dataRaw.username,
                email: '',
                phone: '',
                gender: 'Others',
                avatar: '',
                address: '',
                dateOfBirth: null,
                typeAccount: 'GOOGLE',
                groupId: 2
            })
            user = user.get({ plain: true })

            let scope = await getGroupRoles(user)
            let payload = {
                id: user.id,
                idGoogle: user.idGoogle,
                username: user.username,
                email: user.email ? user.email : '',
                gender: user.gender ? user.gender : '',
                address: user.address ? user.address : '',
                phone: user.phone ? user.phone : '',
                avatar: user.avatar ? user.avatar : '',
                dateOfBirth: user.dateOfBirth ? user.dateOfBirth : null,
                typeAccount: user.typeAccount,
                data: scope,
            }
            let accessToken = await createAccessToken(payload)
            let refreshToken = await createRefreshToken(payload)

            return {
                access_token: accessToken,
                refresh_token: refreshToken,
                data: scope,
                idGoogle: payload.idGoogle,
                email: payload.email,
                phone: payload.phone,
                avatar: payload.avatar,
                gender: payload.gender,
                address: payload.address,
                dateOfBirth: payload.dateOfBirth,
                typeAccount: payload.typeAccount,
                username: payload.username,
            }
        } else {
            let scope = await getGroupRoles(user)
            let payload = {
                id: user.id,
                idGoogle: user.idGoogle,
                username: user.username,
                email: user.email ? user.email : '',
                gender: user.gender ? user.gender : '',
                address: user.address ? user.address : '',
                phone: user.phone ? user.phone : '',
                avatar: user.avatar ? user.avatar : '',
                dateOfBirth: user.dateOfBirth ? user.dateOfBirth : null,
                typeAccount: user.typeAccount,
                data: scope,
            }
            let accessToken = await createAccessToken(payload)
            let refreshToken = await createRefreshToken(payload)

            return {
                access_token: accessToken,
                refresh_token: refreshToken,
                data: scope,
                idGoogle: payload.idGoogle,
                email: payload.email,
                phone: payload.phone,
                avatar: payload.avatar,
                gender: payload.gender,
                address: payload.address,
                dateOfBirth: payload.dateOfBirth,
                typeAccount: payload.typeAccount,
                username: payload.username,
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error user social-media login from server",
            EC: "0",
            DT: ""
        }
    }
}

const handleLoginFacebook = async (dataRaw) => {
    try {
        let user = null

        user = await db.User.findOne({
            where: { idFacebook: dataRaw.idFacebook, typeAccount: 'FACEBOOK' },
            raw: true
        })

        if (!user) {
            user = await db.User.create({
                email: '',
                phone: '',
                gender: 'Others',
                avatar: '',
                address: '',
                dateOfBirth: null,
                username: dataRaw.username,
                idFacebook: dataRaw.idFacebook,
                typeAccount: 'FACEBOOK',
                groupId: 2
            })
            user = user.get({ plain: true })

            let scope = await getGroupRoles(user)
            let payload = {
                id: user.id,
                idFacebook: user.idFacebook,
                email: user.email ? user.email : '',
                username: user.username,
                gender: user.gender ? user.gender : '',
                address: user.address ? user.address : '',
                dateOfBirth: user.dateOfBirth ? user.dateOfBirth : null,
                phone: user.phone ? user.phone : '',
                avatar: user.avatar ? user.avatar : '',
                typeAccount: user.typeAccount,
                data: scope,
            }
            let accessToken = await createAccessToken(payload)
            let refreshToken = await createRefreshToken(payload)

            return {
                access_token: accessToken,
                refresh_token: refreshToken,
                data: scope,
                idFacebook: payload.idFacebook,
                email: payload.email,
                phone: payload.phone,
                avatar: payload.avatar,
                dateOfBirth: payload.dateOfBirth,
                gender: payload.gender,
                address: payload.address,
                typeAccount: payload.typeAccount,
                username: payload.username,
            }
        } else {
            let scope = await getGroupRoles(user)
            let payload = {
                id: user.id,
                idFacebook: user.idFacebook,
                email: user.email ? user.email : '',
                username: user.username,
                avatar: user.avatar ? user.avatar : '',
                gender: user.gender ? user.gender : '',
                address: user.address ? user.address : '',
                dateOfBirth: user.dateOfBirth ? user.dateOfBirth : null,
                phone: user.phone ? user.phone : '',
                typeAccount: user.typeAccount,
                data: scope,
            }
            let accessToken = await createAccessToken(payload)
            let refreshToken = await createRefreshToken(payload)

            return {
                access_token: accessToken,
                refresh_token: refreshToken,
                idFacebook: payload.idFacebook,
                data: scope,
                email: payload.email,
                phone: payload.phone,
                gender: payload.gender,
                avatar: payload.avatar,
                dateOfBirth: payload.dateOfBirth,
                address: payload.address,
                typeAccount: payload.typeAccount,
                username: payload.username,
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error user social-media login from server",
            EC: "0",
            DT: ""
        }
    }
}

const handleUpdateCodeUser = async (email, code) => {
    try {
        let user = await db.User.findOne(
            { where: { [Op.and]: [{ email: email }, { typeAccount: 'LOCAL' }] } }
        )

        if (!user) {
            return {
                EM: "This email is not registered account.",
                EC: "0",
                DT: "email"
            }
        } else {
            await user.update(
                { codeOTP: code },
            )

            return {
                EM: "Update code successfully!",
                EC: "1",
                DT: ""
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error update user code from server",
            EC: "0",
            DT: ""
        }
    }

}

const handleResetPassword = async (rawData) => {
    try {
        let user = await db.User.findOne(
            { where: { [Op.and]: [{ email: rawData.email }, { typeAccount: 'LOCAL' }] } }
        )

        if (!user) {
            return {
                EM: "This email is not registered account.",
                EC: "0",
                DT: "email"
            }
        }

        if (user.codeOTP !== rawData.codeOTP) {
            return {
                EM: "Code OTP is invalid.",
                EC: "0",
                DT: "code"
            }
        }

        let newPassword = hashUserPassword(rawData.confirmPassword)
        await user.update(
            { password: newPassword },
        )

        return {
            EM: "Reset password successfully!",
            EC: "1",
            DT: ""
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error update user code from server",
            EC: "0",
            DT: ""
        }
    }

}

module.exports = {
    handleRegisterUser, handleLoginUser, handleLoginGoogle, handleLoginFacebook, handleUpdateCodeUser, handleResetPassword
}