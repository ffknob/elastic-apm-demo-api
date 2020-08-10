import { Request, Response, NextFunction } from 'express';

import axios from 'axios';

import { LoggerService, GenericError } from '@ffknob/elastic-apm-demo-shared';

import { ApiRequestLocals } from '../shared/interfaces';
import { AbstractService, ServiceFactory } from '../models';

export const requestProxy = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        serviceName,
        apiVersion,
        path
    }: ApiRequestLocals = res.locals as ApiRequestLocals;

    if (!serviceName) {
        const err: GenericError<any> = {
            code: 400,
            message: 'Service not defined'
        };

        next(err);
        return;
    }

    const service: AbstractService = ServiceFactory.create(serviceName);

    const serviceUrl: string = service.getUrl(path);

    LoggerService.logger.debug(
        `Sending ${req.method} request to ${serviceUrl}`
    );

    switch (req.method) {
        case 'GET':
            axios
                .get(serviceUrl)
                .then((data: any) => res.json(data))
                .catch(err => next(err));
            break;
        case 'POST':
            axios
                .post(serviceUrl, {
                    ...req.body
                })
                .then(({ headers, data }: any) => {
                    switch (headers['content-type']) {
                        case 'text/html':
                            res.send(data);
                            break;
                        case 'application/json':
                            res.json(data);
                            break;
                        default:
                            res.send(data);
                    }
                })
                .catch(err => next(err));
            break;
        case 'OPTIONS':
            axios
                .options(serviceUrl, {
                    ...req.body
                })
                .then(({ data }: any) => res.json(data))
                .catch(err => next(err));
            break;
    }
};
