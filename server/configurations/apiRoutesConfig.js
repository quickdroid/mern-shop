import authenticationRouter from '../routes/authenticationRoutes';
import cors                 from 'cors';
import wildcardRouter       from '../routes/wildcardRoute';

export default function ConfigApiRoutes(app) {
  app.use(cors());
  app.use(authenticationRouter);
  app.use(wildcardRouter);
}
