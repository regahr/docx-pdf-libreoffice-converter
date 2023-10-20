import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import indexRouter from './routes';
import config from './configs/env.config';
import { accessLogStream } from './utils/devices.util';
import { ErrorHandler } from './middlewares/error-handler.middleware';

const connectDB = require('./utils/db');

const app = express();

connectDB();

app.use(cors({
  credentials: true, // important part here
  origin: process.env.NODE_ENV === 'production' ? ['https://app.grof.co']
    : ['http://localhost:3000'],
  optionsSuccessStatus: 200
}));

function shouldCompress(req, res) {
  return compression.filter(req, res);
}

app.use(compression({ filter: shouldCompress }));

app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream() })); // creating access to file
app.use(bodyParser.json({ limit: '50mb', extended: false }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/api/v1/finance', indexRouter);

app.use((req, res) => {
  res.header('Access-Control-Allow-Origin', `${config.app.host}:${config.app.port}`);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Secret, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Content-Type', 'application/json');
});

app.use(ErrorHandler);
// SendgridApiService.sendMailTest('rega.hruzty@gmail.com');

app.listen(config.app.port, () => {
  process.stdout.write(`App is listening on port ${config.app.port} \n`);
});

module.exports = app;
