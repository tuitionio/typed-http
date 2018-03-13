import { IncomingMessage } from "http";
import { injectable } from "inversify";
import * as _ from "lodash";
import { Headers } from "request";
import * as AsyncRequest from "request-promise";
import { ContentType } from "./contentType";
import { HttpHeader } from "./httpHeader";
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

@injectable()
export class ApiClient {
    protected headers: Headers;
    protected baseUrl: string;

    protected createRequest(method: HttpMethod, uri: string, parameters?: any): IHttpClientRequest {
        const requestHeaders: Headers = {};
        requestHeaders[HttpHeader.Accept] = ContentType.ApplicationJson;

        switch (method) {
            case HttpMethod.Put:
            case HttpMethod.Post:
            case HttpMethod.Patch:
                if (_.isObject(parameters)) {
                    requestHeaders[HttpHeader.ContentType] = ContentType.ApplicationJson;
                }
                break;
        }

        return {
            settings: {
                method,
                baseUrl: this.baseUrl,
                uri,
                headers: { ...requestHeaders, ...this.headers },
                body: parameters,
                json: requestHeaders[HttpHeader.ContentType] === ContentType.ApplicationJson
            }
        } as any;
    }

    protected async execute<T>(request: IHttpClientRequest): Promise<T> {
        request.settings.transform = (body, response): IHttpClientResponse => {
            return {
                result: response,
                content: body
            };
        };

        const response: IHttpClientResponse = await AsyncRequest(request.settings)
            .then(response => response)
            .catch(error => error.response);
        return _.isFunction(request.handler) ? request.handler(request, response) : response.content;
    }

    // -----------------------------------------------------------------------------------------------------------------

    protected delete(uri: string): IHttpClientRequest {
        return this.createRequest(HttpMethod.Delete, uri);
    }

    protected get(uri: string): IHttpClientRequest {
        return this.createRequest(HttpMethod.Get, uri);
    }

    protected patch(uri: string, parameters?: any): IHttpClientRequest {
        return this.createRequest(HttpMethod.Patch, uri, parameters);
    }

    protected post(uri: string, parameters?: any): IHttpClientRequest {
        return this.createRequest(HttpMethod.Post, uri, parameters);
    }

    protected put(uri: string, parameters?: any): IHttpClientRequest {
        return this.createRequest(HttpMethod.Put, uri, parameters);
    }
}
