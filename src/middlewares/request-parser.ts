import { Request, Response, NextFunction } from 'express';

import { ApiRequestLocals } from '../shared/interfaces';

export const requestParser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const splittedPath = req.originalUrl.split('/');

    const apiVersion: string = splittedPath[2];
    const serviceName: string = splittedPath[3];
    const path: string = '/' + splittedPath.slice(4).join('/');

    const apiRequestLocals: ApiRequestLocals = {
        apiVersion,
        serviceName,
        path
    };

    res.locals = { ...res.locals, ...apiRequestLocals };

    next();
};
