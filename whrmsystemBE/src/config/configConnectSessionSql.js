import Sequelize from "sequelize";
import session from "express-session";
import passport from 'passport'
import 'dotenv/config'; 

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config.json')[env];

const configConnectSessionSql = (app) => {
    const SequelizeStore = require("connect-session-sequelize")(session.Store);

    const sequelize = new Sequelize(config.database, config.username, config.password, config);

    const myStore = new SequelizeStore({
        db: sequelize
    });

    app.use(
        session({
            secret: "keyboard cat",
            store: myStore,
            saveUninitialized: false,
            resave: false,
            proxy: true,
            expiration: 172800000,
            cookie: { expires: 172800000 }
        })
    );

    myStore.sync();

    app.use(passport.authenticate('session'));

    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, { email: user.email ? user.email : '', username: user.username, phone: user.phone, roles: user.data.Roles });
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, { email: user.email ? user.email : '', username: user.username, phone: user.phone, roles: user.roles });
        });
    });
}

export default configConnectSessionSql;