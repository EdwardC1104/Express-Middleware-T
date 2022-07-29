import { Router } from 'express';
import { protectedRoute } from '@middlewares/protectedRoute';

const router = Router();

router.get('/profile/', protectedRoute, (req, res) => {
    const user = req.user as Express.User;

    res.send(
        `<h1>Profile</h1>
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <a href="/delete">Delete</a>
        `,
    );
});

export { router as profile };
