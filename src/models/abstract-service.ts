import { GenericError } from '@ffknob/elastic-apm-demo-shared';

import { Service } from '../shared/interfaces';

export abstract class AbstractService implements Service {
    abstract SERVICE_NAME: string;
    abstract SERVICE_URL?: string;

    abstract getName(): string;

    getUrl(path?: string): string {
        if (this.SERVICE_URL) {
            let url: string = this.SERVICE_URL;

            if (path) {
                url = url.replace(/\/$/, '') + path;
            }

            return url;
        } else {
            throw <GenericError<any>>{
                code: 500,
                message: `Could not determine service url`
            };
        }
    }
}
