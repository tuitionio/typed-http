import { injectable } from "inversify";
import { ApiClient, IHttpClientRequest } from "./apiClient";

@injectable()
export class HttpClient extends ApiClient {

    public delete(uri: string): IHttpClientRequest {
        return super.delete(uri);
    }

    public get(uri: string): IHttpClientRequest {
        return super.get(uri);
    }

    public post(uri: string, parameters?: any): IHttpClientRequest {
        return super.post(uri, parameters);
    }

    public put(uri: string, parameters?: any): IHttpClientRequest {
        return super.put(uri, parameters);
    }
}
