import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send(
        'Welcome! <a href="/signup">Sign Up</a> <a href="/login">Login</a> <a href="/logout">Logout</a> <a href="/profile">Profile</a>',
    );
});

export { router as root };
