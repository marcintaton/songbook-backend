import mongoose, { Schema } from 'mongoose';

const songSchema = new Schema({
  songID: String,
  lyrics: String,
});

const Song = mongoose.model('Song', songSchema, 'songs');

export default Song;
