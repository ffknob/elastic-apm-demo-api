import { Service } from './service';

export class SimulationService extends Service {
    static SERVICE_NAME = 'simulation';
    static SERVICE_URL = process.env.SIMULATION_SERVICE_URL;
}
