import { Service } from './service';

export class DataService extends Service {
    static SERVICE_NAME = 'data';
    static SERVICE_URL = process.env.DATA_SERVICE_URL;
}
