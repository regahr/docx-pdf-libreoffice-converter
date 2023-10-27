import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import indexRouter from './routes';

const app = express();

function shouldCompress(req, res) {
  return compression.filter(req, res);
}

app.use(compression({ filter: shouldCompress }));

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb', extended: false }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/api/v1/docx-processor', indexRouter);

app.listen(4003, () => {
  process.stdout.write('App is listening on port 4003 \n');
});

module.exports = app;
