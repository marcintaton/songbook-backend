import { NextFunction, Request, Response } from 'express';
import logger from '@src/utils/logging';
import HttpException from '@src/errors/HttpException';

export default function handleExceptions(
  err: HttpException,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  // log error

  const status = err.status || 500;
  const message = err.message || 'Something failed';
  logger.error(`Exception ocurred: ${status} ${message}`);
  res.status(status).send({ status, message });
}
