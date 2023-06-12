// eslint-disable-next-line import/order
import config from 'config';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export default function setupPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: `${config.get('serverUrl')}api/auth/google/redirect`,
        scope: ['profile'],
      },
      function verify(accessToken, refreshToken, profile, cb) {
        console.log(accessToken);
        console.log(profile);
        return cb(null, {
          id: profile.id,
          name: profile.displayName,
          // accessToken,
          // refreshToken,
        });
      }
    )
  );

  passport.serializeUser((user: any, cb) => {
    cb(null, user);
  });

  passport.deserializeUser(async (user: any, cb) => {
    return cb(null, user);
  });
}
