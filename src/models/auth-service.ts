import { AbstractService } from './abstract-service';

export class AuthService extends AbstractService {
    SERVICE_NAME = 'auth';
    SERVICE_URL = process.env.AUTH_SERVICE_URL;

    getName(): string {
        return this.SERVICE_NAME;
    }
}
