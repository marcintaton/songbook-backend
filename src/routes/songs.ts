import { Router, Request, Response } from 'express';
import Song from '@src/models/songs';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const songs = await Song.find();
  res.status(200).send(songs);
});

router.get('/metadata', async (req: Request, res: Response) => {
  const songs = await Song.find().select('title tags');
  res.status(200).send(songs);
});

router.get('/:id', async (req: Request, res: Response) => {
  const song = await Song.findOne({ _id: req.params.id });
  res.status(200).send(song);
});

export default router;
