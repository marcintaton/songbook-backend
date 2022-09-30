import { Router, Request, Response } from 'express';
import Song from '@src/models/songs';
import Tag from '@src/models/tags';
import { formSchema } from '@src/validation/songVlidation';
import ValidatePassword from '@src/middleware/reqPasswordMiddleware';
import ValidateRequestData from '@src/middleware/validationMiddleware';

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

router.post(
  '/',
  [ValidatePassword('FORM_PASSWORD'), ValidateRequestData(formSchema)],
  async (req: Request, res: Response) => {
    const data = req.body;

    const song = {
      title: data.title,
      tags: data.tags,
      lyrics: data.lyrics,
      notes: data.notes,
      credits: data.credits,
    };

    try {
      await Song.create(song);
      res.status(200).send('Success');
    } catch (e) {
      res.status(500).json({
        ok: false,
        message: 'Database failed to create Song',
      });
    }
  }
);

router.put(
  '/:id',
  [ValidatePassword('FORM_PASSWORD'), ValidateRequestData(formSchema)],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const song = {
      title: data.title,
      tags: data.tags,
      lyrics: data.lyrics,
      notes: data.notes,
      credits: data.credits,
    };

    try {
      await Song.findOneAndUpdate({ _id: id }, song);
      res.status(200).send('Success');
    } catch (e) {
      res.status(500).json({
        ok: false,
        message: `Database failed to update Song: ${id}`,
      });
    }
  }
);

export default router;
