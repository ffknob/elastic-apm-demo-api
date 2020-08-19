import { Request, Response, NextFunction } from 'express';

import { ApiRequestLocals } from '../shared/interfaces';

export const requestParser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const path: string = req.originalUrl;
    const splittedPath = path.split('/');

    const apiVersion: string = splittedPath[2];
    const serviceName: string = splittedPath[3];
    const servicePath: string = '/' + splittedPath.slice(4).join('/');

    const apiRequestLocals: ApiRequestLocals = {
        apiVersion,
        serviceName,
        path,
        servicePath
    };

    res.locals = { ...res.locals, ...apiRequestLocals };

    next();
};
