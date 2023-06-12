import config from 'config';
import { Router, Request, Response } from 'express';
import passport from 'passport';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req: Request, res: Response) {
    // Successful authentication, redirect home.
    console.log('Successful');

    res.redirect(config.get('auth.successRedirect'));
  }
);

router.get('/me', function (req: Request, res: Response) {
  // Successful authentication, redirect home.
  console.log(req.user);
  res.status(200).send(req.user);
});

export default router;
