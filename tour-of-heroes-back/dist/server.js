"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = __importDefault(require("./app"));
const PORT = 3000;
const server = http.createServer(app_1.default);
server.listen(PORT, '0.0.0.0', () => {
    console.log('Server is running ...');
});
