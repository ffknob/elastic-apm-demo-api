import { GenericError } from '@ffknob/elastic-apm-demo-shared';

export class Service {
    static SERVICE_NAME: string;
    static SERVICE_URL: string | undefined;

    getUrl(path?: string): string {
        const serviceUrl: string | undefined =
            process.env.SIMULATION_SERVICE_URL;

        if (serviceUrl) {
            let url: string = serviceUrl;

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
