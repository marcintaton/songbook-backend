import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export default function ValidateRequestData(schema: Joi.Schema) {
  return async function validationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const data = req.body;

    const joiResult = schema.validate(data);

    if (joiResult.error) {
      res.status(400).send('Invalid data');
      return;
    }

    next();
  };
}
