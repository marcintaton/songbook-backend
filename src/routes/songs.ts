import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  console.log('Getting all songs lyrics');
  res.status(200).send('XD');
});

export default router;
