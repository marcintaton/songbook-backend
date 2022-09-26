import { Router, Request, Response } from 'express';
import Song from '@src/models/songs';
import Tag from '@src/models/tags';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const songs = await Song.find();
  res.status(200).send(songs);
});

router.get('/metadata/all', async (req: Request, res: Response) => {
  const songs = await Song.find().select('title tags').sort('title');
  const tags = await Tag.find();
  const songsWithTags = songs.map((song) => {
    return {
      ...song.toObject(),
      tags: song.tags.map(
        // eslint-disable-next-line no-underscore-dangle
        (tag) => tags.find((x) => x._id.toHexString() === tag)?.name
      ),
    };
  });

  res.status(200).send(songsWithTags);
});

router.get('/:id', async (req: Request, res: Response) => {
  const song = await Song.findOne({ _id: req.params.id });
  const tags = await Tag.find();

  if (!song) {
    res.status(400).send('No such song');
    return;
  }

  const songWithTags = {
    ...song.toObject(),
    tags: song.tags.map(
      // eslint-disable-next-line no-underscore-dangle
      (tag) => tags.find((x) => x._id.toHexString() === tag)?.name
    ),
  };

  res.status(200).send(songWithTags);
});

export default router;
