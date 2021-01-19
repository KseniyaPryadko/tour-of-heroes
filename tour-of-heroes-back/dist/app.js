"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const error_1 = require("./types/error");
require('./api/db');
const index_1 = __importDefault(require("./api/routes/index"));
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', index_1.default);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.status(200).json({});
    }
    else {
        next();
    }
});
app.use((_, __, next) => {
    const error = new error_1.ServerError('Not found');
    error.status = 404;
    next(error);
});
app.use((err, _, res, __) => {
    res.status(err.status || 500).json(err);
});
module.exports = app;
