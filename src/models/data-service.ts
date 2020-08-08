import { AbstractService } from './abstract-service';

export class DataService extends AbstractService {
    SERVICE_NAME = 'data';
    SERVICE_URL = process.env.DATA_SERVICE_URL;

    getName(): string {
        return this.SERVICE_NAME;
    }
}
