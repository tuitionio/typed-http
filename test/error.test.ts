import { expect } from "chai";
import { ApiClient, HttpClientRequest, HttpStatusCode } from "../src";
import * as http from "http";

describe("API Client", () => {

    it("response handler should get the response object", async () => {
        const port = 8000;

        class TestApiClient extends ApiClient {
            public constructor() {
                super();
                this.baseUrl = `http://localhost:${port}`;
            }

            public responseHandler(request: HttpClientRequest, response: http.IncomingMessage) {
                expect(response.statusCode).to.equal(HttpStatusCode.InternalServerError);
                return true;
            }

            public async error(): Promise<boolean> {
                return this.execute<boolean>(this.get("/"));
            }
        }

        const server = http.createServer((req, res) => {
            res.statusCode = HttpStatusCode.InternalServerError;
            res.end();
        });
        server.listen(port);

        const client = new TestApiClient();
        expect(await client.error()).to.be.true;
        await server.close();
    });

});
