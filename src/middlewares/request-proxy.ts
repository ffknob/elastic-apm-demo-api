import { Request, Response, NextFunction } from 'express';

import axios from 'axios';

import { GenericError } from '@ffknob/elastic-apm-demo-shared';

import { ApiRequestLocals } from '../shared/interfaces';
import { Service, ServiceFactory } from '../models';

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

    const service: Service = ServiceFactory.create(serviceName);

    const serviceUrl: string = service.getUrl(path);

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
                .then(({ data }: any) => res.json(data))
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
