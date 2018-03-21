"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const _ = require("lodash");
const AsyncRequest = require("request-promise");
const contentType_1 = require("./contentType");
const httpHeader_1 = require("./httpHeader");
const httpMethod_1 = require("./httpMethod");
let ApiClient = class ApiClient {
    createRequest(method, uri, parameters) {
        const requestHeaders = {};
        requestHeaders[httpHeader_1.HttpHeader.Accept] = contentType_1.ContentType.ApplicationJson;
        switch (method) {
            case httpMethod_1.HttpMethod.Put:
            case httpMethod_1.HttpMethod.Post:
            case httpMethod_1.HttpMethod.Patch:
                if (_.isObject(parameters)) {
                    requestHeaders[httpHeader_1.HttpHeader.ContentType] = contentType_1.ContentType.ApplicationJson;
                }
                break;
        }
        return {
            settings: {
                method,
                baseUrl: this.baseUrl,
                uri,
                headers: Object.assign({}, requestHeaders, this.headers),
                body: parameters,
                json: requestHeaders[httpHeader_1.HttpHeader.ContentType] === contentType_1.ContentType.ApplicationJson
            }
        };
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            request.settings.transform = (body, response) => {
                return {
                    result: response,
                    content: body
                };
            };
            const response = yield AsyncRequest(request.settings)
                .then(response => response)
                .catch(error => {
                if (error.statusCode) {
                    return error;
                }
                throw error;
            });
            return _.isFunction(request.handler) ? request.handler(request, response) : response.content;
        });
    }
    delete(uri) {
        return this.createRequest(httpMethod_1.HttpMethod.Delete, uri);
    }
    get(uri) {
        return this.createRequest(httpMethod_1.HttpMethod.Get, uri);
    }
    patch(uri, parameters) {
        return this.createRequest(httpMethod_1.HttpMethod.Patch, uri, parameters);
    }
    post(uri, parameters) {
        return this.createRequest(httpMethod_1.HttpMethod.Post, uri, parameters);
    }
    put(uri, parameters) {
        return this.createRequest(httpMethod_1.HttpMethod.Put, uri, parameters);
    }
};
ApiClient = __decorate([
    inversify_1.injectable()
], ApiClient);
exports.ApiClient = ApiClient;
