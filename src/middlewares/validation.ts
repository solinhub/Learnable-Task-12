import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';

const validateData = (schema: Schema): ((req: Request, res: Response, next: NextFunction) => void) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body);
        if (error?.details?.[0]?.message) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        next();
    };
};

export default validateData;