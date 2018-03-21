import { ApiClient, HttpClientRequest } from "./apiClient";
export declare class HttpClient extends ApiClient {
    execute<T>(request: HttpClientRequest): Promise<T>;
    delete(uri: string): HttpClientRequest;
    get(uri: string): HttpClientRequest;
    post(uri: string, parameters?: any): HttpClientRequest;
    put(uri: string, parameters?: any): HttpClientRequest;
}
