import { Request, Response, NextFunction } from 'express';

import { ApiRequestLocals } from '../shared/interfaces';

export const requestParser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const splittedPath = req.originalUrl.split('/');

    const apiRequestLocals: ApiRequestLocals = {
        apiVersion: splittedPath[2],
        serviceName: splittedPath[3],
        path: '/' + splittedPath.slice(4).join('/')
    };

    res.locals = { ...res.locals, ...apiRequestLocals };

    next();
};
