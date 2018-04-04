/// <reference types="node" />
import { IncomingMessage } from "http";
import { ApiClient, HttpClientRequest } from "./apiClient";
export declare class HttpClient extends ApiClient {
    protected responseHandler(request: HttpClientRequest, response: IncomingMessage, content: any): any;
    execute<T>(request: HttpClientRequest): Promise<T>;
    delete(uri: string): HttpClientRequest;
    get(uri: string): HttpClientRequest;
    post(uri: string, parameters?: any): HttpClientRequest;
    put(uri: string, parameters?: any): HttpClientRequest;
}
