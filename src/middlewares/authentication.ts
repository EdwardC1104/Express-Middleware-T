import { db } from '@databases/db';
import { Router } from 'express';
import passport from 'passport';
import { passwordIsValid } from '@utils/passwords';
import { Strategy as LocalStrategy } from 'passport-local';
import cookieSession from 'cookie-session';

const router = Router();

router.use(
    cookieSession({
        name: 'session',
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY as string],
    }),
);

router.use(passport.initialize());
router.use(passport.session());

passport.use(
    new LocalStrategy((username, password, done) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }

            const isValid = passwordIsValid(password, user.passwordHash, user.passwordSalt);

            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
        done(err, user);
    });
});

export { router as authentication };
