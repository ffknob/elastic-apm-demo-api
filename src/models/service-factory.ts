import { GenericError } from '@ffknob/elastic-apm-demo-shared';

import { Service } from './service';
import { SimulationService } from './simulation-service';
import { AuthService } from './auth-service';
import { DataService } from './data-service';

export class ServiceFactory {
    static create(serviceName: string): Service {
        switch (serviceName) {
            case SimulationService.SERVICE_NAME:
                return new SimulationService();
            case AuthService.SERVICE_NAME:
                return new AuthService();
            case DataService.SERVICE_NAME:
                return new DataService();
            default:
                throw <GenericError<any>>{
                    code: 404,
                    message: `Service not available: ${serviceName}`
                };
        }
    }
}
