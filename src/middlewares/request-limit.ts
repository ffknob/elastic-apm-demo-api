import { Request, Response, NextFunction } from 'express';

import { LoggerService } from '@ffknob/elastic-apm-demo-shared';

export const requestLimit = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    LoggerService.logger.debug(`TODO: Request limit`);

    next();
};
