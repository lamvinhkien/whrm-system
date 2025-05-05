import passport from 'passport';
import GoogleStrategy from 'passport-google-oidc';
import { handleLoginGoogle } from '../../service/login-register';
import 'dotenv/config';

const configGoogleLogin = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.NODE_URL + '/api/oauth2/redirect/google',
        scope: ['profile', 'email']
    }, async function verify(issuer, profile, cb) {
        let dataRaw = {
            idGoogle: profile.id,
            username: profile.displayName
        }
        let user = await handleLoginGoogle(dataRaw)

        return cb(null, user)
    }));
}

export default configGoogleLogin;