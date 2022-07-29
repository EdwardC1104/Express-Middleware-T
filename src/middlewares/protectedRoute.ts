import { NextFunction, Request, Response } from 'express';

const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

export { protectedRoute };
