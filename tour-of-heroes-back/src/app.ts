import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');

import { Request, Response, NextFunction } from 'express';
import { ServerError } from './types/error';

require('./api/db');

import routesApi from './api/routes/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use('/api', routesApi);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.status(200).json({});
    } else {
        next();
    }
});
app.use((_: Request, __: Response, next: NextFunction) => {
    const error = new ServerError('Not found');
    error.status = 404;
    next(error);
});
app.use((err: ServerError, _: Request, res: Response, __: NextFunction) => {
    res.status(err.status || 500).json(err);
});

export = app;
