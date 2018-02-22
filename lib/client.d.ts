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
export declare abstract class HttpClient {
    protected headers: Headers;
    protected baseUrl: string;
    protected createRequest(method: HttpMethod, uri: string, parameters?: any): IHttpClientRequest;
    protected execute<T>(request: IHttpClientRequest): Promise<T>;
    protected delete(uri: string): IHttpClientRequest;
    protected get(uri: string): IHttpClientRequest;
    protected post(uri: string, parameters?: any): IHttpClientRequest;
    protected put(uri: string, parameters?: any): IHttpClientRequest;
}
