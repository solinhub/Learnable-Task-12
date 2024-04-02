import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user-model';

dotenv.config();
declare global {
    namespace Express {
        interface Request {
            user?: any; 
        }
    }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (err, user: any) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        req.user = User;
        next();
    });
};

export default authenticateToken;