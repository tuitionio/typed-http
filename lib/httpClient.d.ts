import { ApiClient, IHttpClientRequest } from "./apiClient";
export declare class HttpClient extends ApiClient {
    execute<T>(request: IHttpClientRequest): Promise<T>;
    delete(uri: string): IHttpClientRequest;
    get(uri: string): IHttpClientRequest;
    post(uri: string, parameters?: any): IHttpClientRequest;
    put(uri: string, parameters?: any): IHttpClientRequest;
}
