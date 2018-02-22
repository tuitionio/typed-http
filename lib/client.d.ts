/// <reference types="node" />
import { IncomingMessage } from "http";
import { Headers } from "request";
import * as AsyncRequest from "request-promise";
import { HttpMethod } from "./httpMethod";
export interface HttpClientResponse<T> {
    result: IncomingMessage;
    content: T;
}
export interface IHttpClientResponse extends HttpClientResponse<any> {
}
export interface HttpClientRequest<T, C> {
    settings: AsyncRequest.Options;
    handler?: (request: HttpClientRequest<T, C>, response: HttpClientResponse<T>) => Promise<any>;
    context?: C;
}
export interface IHttpClientRequest extends HttpClientRequest<any, any> {
}
export declare class HttpClient {
    protected headers: Headers;
    protected baseUrl: string;
    protected createRequest(method: HttpMethod, uri: string, parameters?: any): IHttpClientRequest;
    execute<T>(request: IHttpClientRequest): Promise<T>;
    delete(uri: string): IHttpClientRequest;
    get(uri: string): IHttpClientRequest;
    post(uri: string, parameters?: any): IHttpClientRequest;
    put(uri: string, parameters?: any): IHttpClientRequest;
}
