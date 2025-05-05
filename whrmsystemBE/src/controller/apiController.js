import loginRegister from "../service/login-register"
import nodemailer from 'nodemailer'
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

const handleRegister = async (req, res) => {
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

        let data = await loginRegister.handleRegisterUser(req.body)

        return res.json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
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

const handleLogin = async (req, res) => {
    try {
        if (!req.body.valueLogin || !req.body.password) {
            return res.json({
                EM: "Lack of parameters",
                EC: "0"
            })
        }

        let regEmail = /\S+@\S+\.\S+/;
        let validateEmail = regEmail.test(req.body.valueLogin)

        let regPhone = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
        let validatePhone = regPhone.test(req.body.valueLogin)

        if (validateEmail || validatePhone) {
            let data = await loginRegister.handleLoginUser(req.body.valueLogin, req.body.password)

            if (data.EC === "1") {
                res.cookie("at_user", data.DT.access_token, { httpOnly: true, maxAge: process.env.EXPIRES_IN_COOKIES })
                res.cookie("rt_user", data.DT.refresh_token, { httpOnly: true, maxAge: process.env.EXPIRES_IN_COOKIES })
            }

            return res.json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            return res.json({
                EM: "Your email or phone number is invalid!",
                EC: "0",
                DT: 'email'
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

const handleLogout = (req, res) => {
    try {
        res.clearCookie("at_user");
        res.clearCookie("rt_user");
        res.clearCookie("connect.sid");
        req.session.destroy();

        return res.json({
            EM: "Remove cookies successfully!",
            EC: "1",
            DT: ""
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

const handleForgotPassword = async (req, res) => {
    try {
        const emailReq = req.body.email
        const OTP = Math.floor(100000 + Math.random() * 900000)
        let regEmail = /\S+@\S+\.\S+/;
        let validateEmail = regEmail.test(emailReq)

        // config read file html
        const filePath = path.join(__dirname, '../templates/forgot-pw.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            email: emailReq,
            otp: OTP
        };
        const htmlToSend = template(replacements);

        // Check email exist
        if (validateEmail === false || emailReq === '') {
            return res.json({
                EC: '0',
                EM: 'Email is invalid.',
                DT: 'email'
            })
        }

        const updateCodeUser = await loginRegister.handleUpdateCodeUser(emailReq, OTP)
        if (updateCodeUser.EC === '0') {
            return res.json({
                EC: updateCodeUser.EC,
                EM: updateCodeUser.EM,
                DT: updateCodeUser.DT
            })
        }

        // Nodemailer send email
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GOOGLE_APP_EMAIL,
                pass: process.env.GOOGLE_APP_PASSWORD
            },
        });
        transporter.sendMail({
            from: `Lam Vinh Kien <${process.env.GOOGLE_APP_EMAIL}>`,
            to: emailReq,
            subject: "RESET YOUR PASSWORD W-HRM System",
            text: "RESET YOUR PASSWORD W-HRM System",
            html: htmlToSend
        });

        return res.json({
            EC: '1',
            EM: 'Send successfully!',
            DT: ''
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

const handleResetPassword = async (req, res) => {
    try {
        let email = req.body.email
        let newPassword = req.body.newPassword
        let confirmPassword = req.body.confirmPassword

        let regEmail = /\S+@\S+\.\S+/;
        let validateEmail = regEmail.test(email)
        if (!validateEmail || email === '') {
            return res.json({
                EM: "Email is invalid!",
                EC: "0",
                DT: "email"
            })
        }

        if (newPassword.length < 6) {
            return res.json({
                EM: "Password length must be at lastest 6 character!",
                EC: "0",
                DT: "new"
            })
        }

        if (confirmPassword !== newPassword) {
            return res.json({
                EM: "New password and confirm password is not same!",
                EC: "0",
                DT: "confirm"
            })
        }

        let data = await loginRegister.handleResetPassword(req.body)
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
    handleRegister, handleLogin, handleLogout, handleForgotPassword, handleResetPassword
}