import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post(
    '/login/',
    passport.authenticate('local', {
        failureRedirect: '/login/',
        successRedirect: '/',
        session: true,
    }),
);

router.get('/login/', (req, res) => {
    const form =
        '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
});

export { router as login };
