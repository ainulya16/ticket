import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import dotEnv from 'dotenv';
import route from './route';
import errorHandler from './helpers/errorHandler';
import swaggerUi from 'swagger-ui-express';

const swaggerDocument = require('./openapi.json');

var options = {
  explorer: true
};


dotEnv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(logger('dev'));
app.use(cors());
app.use(route);
app.use(errorHandler);
app.listen(port);


export default app;
