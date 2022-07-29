import { db } from '@databases/db';
import { Router } from 'express';

const router = Router();

router.get('/delete/', (req, res, next) => {
    if (req.user) {
        db.run('DELETE FROM users WHERE id = ?', [req.user.id], (err) => {
            if (err) {
                return res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
            }
            req.logout((err) => {
                if (err) {
                    return next(err);
                }
            });
            req.session = null;
            res.send(`<p>Deleted</p>`);
        });
    } else {
        res.redirect('/login/');
    }
});

export { router as deleteUser };
