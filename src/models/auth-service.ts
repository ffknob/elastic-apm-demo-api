import { Service } from './service';

export class AuthService extends Service {
    static SERVICE_NAME = 'auth';
    static SERVICE_URL = process.env.AUTH_SERVICE_URL;
}
