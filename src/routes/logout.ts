import { Router } from 'express';

const router = Router();

router.get('/logout/', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });
    req.session = null;
    res.redirect('/');
});

export { router as logout };
