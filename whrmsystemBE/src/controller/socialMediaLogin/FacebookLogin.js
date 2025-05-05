import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { handleLoginFacebook } from '../../service/login-register';
import 'dotenv/config';

const configFacebookLogin = () => {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.NODE_URL + '/api/oauth2/redirect/facebook',
        profileFields: ['id', 'displayName', 'photos', 'email']
    }, async function (accessToken, refreshToken, profile, cb) {
        let dataRaw = {
            idFacebook: profile.id,
            username: profile.displayName
        }
        let user = await handleLoginFacebook(dataRaw)

        return cb(null, user);
    }));
}

export default configFacebookLogin;