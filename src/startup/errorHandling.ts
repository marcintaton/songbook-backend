import 'express-async-errors';
import { exit } from 'process';
import { Express } from 'express';
import logger from '@src/utils/logging';
import handleExceptions from '@src/middleware/errorMiddleware';

export default function setupErrorHandling(server: Express) {
  process.on('unhandledRejection', (ex) => {
    logger.error('Unhandled rejection. Redirecting to exceptions pipeline...');
    throw ex;
  });
  process.on('uncaughtException', (ex) => {
    logger.error(ex.message);
    logger.error('Uncaught exception. Exiting soon...');

    setTimeout(() => exit(1), 5000);
  });
  server.use(handleExceptions);
}
