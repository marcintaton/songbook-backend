import { Request, Response, NextFunction } from 'express';
import argon2 from 'argon2';

export default function ValidatePassword(envAlias: string) {
  return async function ReqPasswordMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const data = req.body;

    if (process.env[envAlias] === undefined) {
      res.status(500).send('Server could not validate password');
      return;
    }

    const isPwdValid = await argon2.verify(
      process.env[envAlias] as string,
      data.password
    );

    if (!isPwdValid) {
      res.status(401).send('Invalid Password');
      return;
    }

    next();
  };
}
