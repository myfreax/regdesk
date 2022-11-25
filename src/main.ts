import * as express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as morgan from 'morgan';

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);

import router from './article/article-router';
app.use('/articles', router);

mongoose.connect('mongodb://localhost:27017/test').then(() => {
  console.info(`MongoDb connected`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});
