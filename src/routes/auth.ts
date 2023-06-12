import config from 'config';
import { Router, Request, Response } from 'express';
import passport from 'passport';
import IUser from '@src/types/interfaces/iUser';
import Session from '@src/models/session';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req: Request, res: Response) {
    // Successful authentication, redirect home.

    res.redirect(config.get('auth.successRedirect'));
  }
);

router.get('/me', async (req: Request, res: Response) => {
  // Successful authentication, redirect home.
  const user = req.user as IUser;
  console.log(user);

  if (user && user.id) {
    res.status(200).send({ id: user.id, name: user.name });
  } else {
    res.status(200).send(undefined);
  }
});

router.get('/logout', async (req: Request, res: Response) => {
  await Session.findOne({ _id: req.sessionID }).deleteOne();
  res.status(200).send();
});

export default router;
