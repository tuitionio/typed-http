import { IncomingMessage } from "http";
import { injectable } from "inversify";
import * as _ from "lodash";
import { Headers } from "request";
import * as AsyncRequest from "request-promise";
import { ContentType } from "./contentType";
import { HttpHeader } from "./httpHeader";
import { HttpMethod } from "./httpMethod";
import "reflect-metadata";

export interface HttpClientRequest {
    settings: AsyncRequest.Options;
}

@injectable()
export class ApiClient {
    protected headers: Headers;
    protected baseUrl: string;

    protected createRequest(method: HttpMethod, uri: string, parameters?: any): HttpClientRequest {
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
                json: requestHeaders[HttpHeader.Accept] === ContentType.ApplicationJson
            }
        } as any;
    }

    protected responseHandler(request: HttpClientRequest, response: IncomingMessage, content: any): any {
        return content;
    }

    protected async exceptionHandler(exception: any): Promise<void> {
        throw exception;
    }

    protected async execute<T>(request: HttpClientRequest): Promise<T> {
        let response = undefined, content = undefined;

        request.settings.transform = (body, res) => {
            response = res;
            content = body;
        };

        try {
            await AsyncRequest(request.settings);
        }
        catch (ex) {
            if (ex.statusCode) {
                response = ex;
            }
            else {
                await this.exceptionHandler(ex);
            }
        }

        return this.responseHandler(request, response, content);
    }

    // -----------------------------------------------------------------------------------------------------------------

    protected delete(uri: string): HttpClientRequest {
        return this.createRequest(HttpMethod.Delete, uri);
    }

    protected get(uri: string): HttpClientRequest {
        return this.createRequest(HttpMethod.Get, uri);
    }

    protected patch(uri: string, parameters?: any): HttpClientRequest {
        return this.createRequest(HttpMethod.Patch, uri, parameters);
    }

    protected post(uri: string, parameters?: any): HttpClientRequest {
        return this.createRequest(HttpMethod.Post, uri, parameters);
    }

    protected put(uri: string, parameters?: any): HttpClientRequest {
        return this.createRequest(HttpMethod.Put, uri, parameters);
    }
}
