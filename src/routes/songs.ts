import { Router, Request, Response } from 'express';
import argon2 from 'argon2';
import Song from '@src/models/songs';
import Tag from '@src/models/tags';
import Joi from 'joi';
import { schemaPOST } from '@src/validation/songVlidation';

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

router.post('/', async (req: Request, res: Response) => {
  const data = req.body;

  if (process.env.FORM_PASSWORD === undefined) {
    res.status(500).send('Server could not validate password');
    return;
  }

  const isPwdValid = await argon2.verify(
    process.env.FORM_PASSWORD,
    data.password
  );

  if (!isPwdValid) {
    res.status(401).send('Invalid Password');
    return;
  }

  const song = {
    title: data.title,
    tags: data.tags,
    lyrics: data.lyrics,
  };

  const joiResult = schemaPOST.validate(song);

  if (joiResult.error) {
    res.status(400).send('Invalid data');
    return;
  }

  try {
    await Song.create(song);
    res.status(200).send('Success');
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: 'Database failed to create Song',
    });
  }
});

export default router;
