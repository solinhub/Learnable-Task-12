import { Request, Response, NextFunction } from 'express';

const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.sendStatus(403);
    }
};

export default authorizeAdmin;