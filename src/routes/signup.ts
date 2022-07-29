import { db } from '@databases/db';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { generatePassword } from '@utils/passwords';

const router = Router();

router.post(
    '/signup/',
    body('username').isAlphanumeric().isLength({ min: 1 }).trim(),
    body('password').isLength({ min: 5 }),
    body('email').isEmail().isLength({ min: 1 }).trim().normalizeEmail(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const username = req.body.username;
        const email = req.body.email;
        const { salt, hash } = generatePassword(req.body.password);

        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            if (row) return res.status(400).json({ errors: [{ msg: 'Username already taken' }] });

            db.run(
                'INSERT INTO users (username, email, passwordSalt, passwordHash) VALUES ($username, $email, $passwordSalt, $passwordHash)',
                {
                    $username: username,
                    $email: email,
                    $passwordSalt: salt,
                    $passwordHash: hash,
                },
            );
            res.redirect('/');
        });
    },
);

router.get('/signup/', (req, res) => {
    const form =
        '<h1>Sign up</h1><form method="post" action="/signup/">\
                    Enter Username:<br><input type="text" name="username" required>\
                    <br>Enter Email:<br><input type="email" name="email" required>\
                    <br>Enter Password:<br><input type="password" name="password" required>\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
});

export { router as signup };
