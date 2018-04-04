import { IncomingMessage } from "http";
import { injectable } from "inversify";
import { ApiClient, HttpClientRequest } from "./apiClient";

@injectable()
export class HttpClient extends ApiClient {

    protected responseHandler(request: HttpClientRequest, response: IncomingMessage, content: any): any {
        return content;
    }

    public async execute<T>(request: HttpClientRequest): Promise<T> {
        return super.execute<T>(request);
    }

    public delete(uri: string): HttpClientRequest {
        return super.delete(uri);
    }

    public get(uri: string): HttpClientRequest {
        return super.get(uri);
    }

    public post(uri: string, parameters?: any): HttpClientRequest {
        return super.post(uri, parameters);
    }

    public put(uri: string, parameters?: any): HttpClientRequest {
        return super.put(uri, parameters);
    }
}
