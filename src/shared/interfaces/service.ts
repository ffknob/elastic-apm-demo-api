export interface Service {
    SERVICE_NAME: string;
    SERVICE_URL?: string;

    getName(): string;
    getUrl(path?: string): string;
}
