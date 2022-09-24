import { Router, Request, Response } from 'express';
import Metadata from '@src/models/metadatas';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const metadata = await Metadata.find();
  res.status(200).send(metadata);
});

router.get('/:id', async (req: Request, res: Response) => {
  const metadata = await Metadata.find({ _id: req.params.id });
  res.status(200).send(metadata);
});

export default router;
