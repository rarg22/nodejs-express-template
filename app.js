const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { ErrorHandler, CorrelationId, HttpRequestLogger } = require('./src/middleware');
const dotenv = require('dotenv');
const helmet = require('helmet')

dotenv.config();

const Routers = require('./src/module/RouterResolver');

app.use(helmet())
app.use(CorrelationId.middleware);
app.use(bodyParser.json());
app.use(HttpRequestLogger.middleware({ outputDir: './logs' }));

Routers.register(app);

app.use(ErrorHandler.NOT_FOUND);
app.use(ErrorHandler.UNEXPECTED_ERROR);

module.exports = app;
