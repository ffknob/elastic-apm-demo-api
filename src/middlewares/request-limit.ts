import { Request, Response, NextFunction } from 'express';

export const requestLimit = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('Request limit');
    next();
};
