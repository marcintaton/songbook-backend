import * as dotenv from 'dotenv';
import express from 'express';
import setupAppRoutes from './startup/appRoutes';
import setupDB from './startup/db';
import setupErrorHandling from './startup/errorHandling';
import setupLogging from './startup/logging';
import setupMiddleware from './startup/middleware';

dotenv.config();

const server = express();

setupDB();

setupLogging(server);
setupMiddleware(server);
setupAppRoutes(server);
setupErrorHandling(server);

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server running`);
});
