"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const apiClient_1 = require("./apiClient");
let HttpClient = class HttpClient extends apiClient_1.ApiClient {
    delete(uri) {
        return super.delete(uri);
    }
    get(uri) {
        return super.get(uri);
    }
    post(uri, parameters) {
        return super.post(uri, parameters);
    }
    put(uri, parameters) {
        return super.put(uri, parameters);
    }
};
HttpClient = __decorate([
    inversify_1.injectable()
], HttpClient);
exports.HttpClient = HttpClient;
