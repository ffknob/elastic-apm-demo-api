import { AbstractService } from './abstract-service';

export class SimulationService extends AbstractService {
    SERVICE_NAME = 'simulation';
    SERVICE_URL = process.env.SIMULATION_SERVICE_URL;

    getName(): string {
        return this.SERVICE_NAME;
    }
}
