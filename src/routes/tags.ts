import { Router, Request, Response } from 'express';
import Tag from '@src/models/tags';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const tags = await Tag.find();
  res.status(200).send(tags);
});

export default router;
