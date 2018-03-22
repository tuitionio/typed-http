/// <reference types="node" />
import { IncomingMessage } from "http";
import { Headers } from "request";
import * as AsyncRequest from "request-promise";
import { HttpMethod } from "./httpMethod";
import "reflect-metadata";
export interface HttpClientRequest {
    settings: AsyncRequest.Options;
}
export declare class ApiClient {
    protected headers: Headers;
    protected baseUrl: string;
    protected createRequest(method: HttpMethod, uri: string, parameters?: any): HttpClientRequest;
    protected responseHandler(request: HttpClientRequest, response: IncomingMessage, content: any): any;
    protected exceptionHandler(exception: any): Promise<void>;
    protected execute<T>(request: HttpClientRequest): Promise<T>;
    protected delete(uri: string): HttpClientRequest;
    protected get(uri: string): HttpClientRequest;
    protected patch(uri: string, parameters?: any): HttpClientRequest;
    protected post(uri: string, parameters?: any): HttpClientRequest;
    protected put(uri: string, parameters?: any): HttpClientRequest;
}
