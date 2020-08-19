import * as dotenv from 'dotenv';
dotenv.config();

import {
    ApmService,
    LoggerService,
    BackendError,
    GenericError
} from '@ffknob/elastic-apm-demo-shared';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import winston from 'winston';
import expressWinston from 'express-winston';

import apiRoutes from './routes/api';

const apmService = ApmService.getInstance();

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    expressWinston.logger({
        transports: [new winston.transports.Console()],
        meta: false,
        msg: 'HTTP {{req.method}} {{req.url}}',
        expressFormat: true,
        colorize: false
    })
);

app.use(
    expressWinston.errorLogger({
        transports: [new winston.transports.Console()]
    })
);

app.use('/api/v1', apiRoutes);

app.use(
    (
        err: GenericError<any>,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        LoggerService.logger.error(err.message);

        apmService.captureError(err.message!);

        const backendError: BackendError<GenericError<any>> = {
            id: res.locals.id,
            success: false,
            statusCode: err.code ? +err.code : 500,
            statusMessage: err.message || 'Internal Server Error',
            metadata: res.locals.metadata,
            data: err
        };

        res.status(err.code ? +err.code : 500).json(backendError);
    }
);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
