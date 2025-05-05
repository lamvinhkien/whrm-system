import jwt from "jsonwebtoken";
import 'dotenv/config';

const createAccessToken = (payload) => {
    try {
        let token = jwt.sign(payload, process.env.PRIVATE_KEY_AT, { expiresIn: process.env.EXPIRES_IN_AT });
        return token;
    } catch (error) {
        console.log(error)
    }
}

const createRefreshToken = (payload) => {
    try {
        let refreshToken = jwt.sign(payload, process.env.PRIVATE_KEY_RT, { expiresIn: process.env.EXPIRES_IN_RT });
        return refreshToken;
    } catch (error) {
        console.log(error)
    }
}

const verifyAccessToken = (token) => {
    try {
        let decoded = jwt.verify(token, process.env.PRIVATE_KEY_AT);

        return {
            data: decoded
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return {
                EC: "0",
                EM: "AccessTokenExpiredError",
                DT: ""
            }
        }
        return {
            EC: "0",
            EM: "User are not authenticated. Please login!",
            DT: ""
        }
    }
}

const verifyRefreshToken = (token) => {
    try {
        let decoded = jwt.verify(token, process.env.PRIVATE_KEY_RT);
        return {
            EC: '1',
            data: decoded
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return {
                EC: "0",
                EM: "RefreshTokenExpiredError",
                DT: ""
            }
        }
        return {
            EC: "0",
            EM: "User are not authenticated. Please login!",
            DT: ""
        }
    }
}

const checkUserLogin = (req, res, next) => {
    try {
        let at_cookiesJWT = req.cookies.at_user
        let rt_cookiesJWT = req.cookies.rt_user

        if (at_cookiesJWT && rt_cookiesJWT) {
            let access_token = verifyAccessToken(at_cookiesJWT)
            let refresh_token = verifyRefreshToken(rt_cookiesJWT)

            if (access_token && access_token.data) {
                req.dataToken = access_token.data
                return next()
            }

            if (access_token.EM === 'AccessTokenExpiredError' && refresh_token.EC === '1') {
                let payload = {
                    id: refresh_token.data.id,
                    email: refresh_token.data.email,
                    username: refresh_token.data.username,
                    phone: refresh_token.data.phone,
                    typeAccount: refresh_token.data.typeAccount,
                    data: refresh_token.data.data,
                }
                let new_at = createAccessToken(payload)
                req.dataToken = payload
                req.accessToken = new_at
                return next()
            }


            return res.json({
                EC: "0",
                EM: "User are not authenticated. Please login!",
                DT: ""
            })
        } else {
            return res.json({
                EC: "0",
                EM: "User are not authenticated. Please login!",
                DT: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            EC: "0",
            EM: "Error from server.",
            DT: ""
        })
    }

}

const checkUserPermission = (req, res, next) => {
    let token = req.dataToken
    let roles = token.data ? token.data.Roles : []

    let currentUrl = req.path
    let canAccess = roles.some((item) => {
        if (item.url === currentUrl) {
            return true
        }
    })

    if (!roles || canAccess === false) {
        return res.json({
            EC: "0",
            EM: "You don't have permission!",
            DT: ""
        })
    } else {
        next()
    }
}

module.exports = {
    createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken, checkUserLogin, checkUserPermission
}