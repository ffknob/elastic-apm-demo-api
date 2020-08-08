import { GenericError } from '@ffknob/elastic-apm-demo-shared';

import { LoggerService } from '@ffknob/elastic-apm-demo-shared';

import { AbstractService } from './abstract-service';
import { SimulationService } from './simulation-service';
import { AuthService } from './auth-service';
import { DataService } from './data-service';

export class ServiceFactory {
    static create(serviceName: string): AbstractService {
        const availableServices: AbstractService[] = [
            new SimulationService(),
            new AuthService(),
            new DataService()
        ];

        const service: AbstractService | undefined = availableServices.find(
            (s: AbstractService) => s.SERVICE_NAME === serviceName
        );

        if (!service) {
            throw <GenericError<any>>{
                code: 404,
                message: `Service not available: ${serviceName}`
            };
        }

        LoggerService.logger.debug(`Service ${serviceName} created`);

        return service;
    }
}
