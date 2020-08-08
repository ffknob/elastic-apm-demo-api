import { GenericError } from '@ffknob/elastic-apm-demo-shared';

import { LoggerService } from '@ffknob/elastic-apm-demo-shared';

import { Service } from './service';
import { SimulationService } from './simulation-service';
import { AuthService } from './auth-service';
import { DataService } from './data-service';

export class ServiceFactory {
    static create(serviceName: string): Service {
        let service: Service;

        switch (serviceName) {
            case SimulationService.SERVICE_NAME:
                service = new SimulationService();
                break;
            case AuthService.SERVICE_NAME:
                service = new AuthService();
                break;
            case DataService.SERVICE_NAME:
                service = new DataService();
                break;
            default:
                throw <GenericError<any>>{
                    code: 404,
                    message: `Service not available: ${serviceName}`
                };
        }

        LoggerService.logger.debug(`Service ${serviceName} created`);

        return service;
    }
}
