import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';
import middlewares from '../api/middlewares';
import config from '../config';

const swaggerUi = require('swagger-ui-express');




export default ({ app }) => {
  // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.enable('trust proxy');

  app.use(cors());

  app.use(require('method-override')());


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(config.api.prefix, routes());


  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });


  app.use(middlewares.errorHandler);
};
