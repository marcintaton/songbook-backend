import { Express } from 'express';
import morgan from 'morgan';
import split from 'split';
import logger from '@src/utils/logging';

const morganStream = split().on('data', (message: string) => {
  logger.http(message);
});

export default function setupLogging(sever: Express) {
  sever.use(morgan('short', { stream: morganStream }));
}
