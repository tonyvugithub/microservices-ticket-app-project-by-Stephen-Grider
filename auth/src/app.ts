/**Refactor from index.ts for testing purpose */

import express from 'express';
//This package to handle any async errors
import 'express-async-errors';
import cookieSession from 'cookie-session';

//Import the errorHandle middleware from common library custom package
import { errorHandler } from '@tonyknvu/common';
import userRoutes from './startup/routes';

export const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
    //If it is in the test environment then return false
  })
);

//Extract all routes
userRoutes(app);

//Error handler middleware
app.use(errorHandler);
