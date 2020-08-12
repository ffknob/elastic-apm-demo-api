import { Request, Response, NextFunction } from 'express';

import axios, { Method, AxiosResponse, AxiosError } from 'axios';

import {
    BackendRedirect,
    LoggerService,
    GenericError
} from '@ffknob/elastic-apm-demo-shared';

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

    const sendResponse = (serviceResponse: any) => {
        const response: AxiosResponse = serviceResponse['response'];
        const status: number = response.status;
        const headers: any = response.headers;
        const data: any = response.data;

        if (status === 302) {
            console.log(serviceResponse);
            const location: string = headers.location;
            const url: URL = new URL(location);
            const noWrapper: boolean =
                url.searchParams.get('noWrapper') !== null;

            console.log(url);

            LoggerService.logger.debug(`Redirecting to ${location}`);

            if (noWrapper) {
                res.redirect(location);
            } else {
                const backendRedirect: BackendRedirect<any> = {
                    success: true,
                    statusCode: 302,
                    statusMessage: 'Redirection',
                    location
                };
                res.json(backendRedirect);
            }
        } else {
            switch (headers['content-type']) {
                case 'text/html':
                    LoggerService.logger.debug(`Sending text/html response`);
                    res.send(data);
                    break;
                case 'application/json':
                    LoggerService.logger.debug(
                        `Sending application/json response`
                    );
                    res.json(data);
                    break;
                default:
                    LoggerService.logger.debug(`Sending default response`);
                    res.send(data);
            }
        }
    };

    axios
        .request({
            url: serviceUrl,
            method: req.method as Method,
            headers: req.headers,
            data: req.body,
            maxRedirects: 0
        })
        .then((serviceResponse: AxiosResponse) => {
            sendResponse(serviceResponse);
        })
        .catch((err: AxiosError) => {
            const response: AxiosResponse | undefined = err['response'];

            if (!response) {
                next(err);
            } else {
                const status: number = response.status;

                // Redirects (302) will be caught as errors
                if (status === 302) {
                    sendResponse(err);
                } else {
                    next(err);
                }
            }
        });
};
