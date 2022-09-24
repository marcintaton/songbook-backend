import { NextFunction, Request, Response } from 'express';

// This file isn't imported anywhere
// It is used automatically
// Do not change its name

type MiddlewareFn = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<void>;

export default function asyncMiddleware(handler: MiddlewareFn) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}
