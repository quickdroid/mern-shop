import 'babel-polyfill';
import express                    from 'express';
import morgan                     from 'morgan';
import bodyParser                 from 'body-parser';
import chalk                      from 'chalk';
import apiRouteConfig             from './configurations/apiRoutesConfig';
import sessionManagementConfig
                                  from './configurations/sessionsManagementConfig';
import expressValidator           from 'express-validator';

/*eslint-disable no-console*/

const DEFAULT_PORT = 8000,
  app = express(),
  host = 'localhost';

sessionManagementConfig(app);

//app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use(express.static('public'));


apiRouteConfig(app);


app.listen(DEFAULT_PORT, function(err) {
  try {
    if (err) {
      console.log(err);
    } else {
      console.log(chalk.green(`Express server listening at http://${host}:${DEFAULT_PORT}...`));
    }
  } catch (err) {
    console.log(chalk.red(err));
  }
});
