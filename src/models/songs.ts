import mongoose, { Schema } from 'mongoose';

const songSchema = new Schema({
  title: String,
  tags: Array,
  lyrics: String,
  notes: String,
  credits: String,
});

const Song = mongoose.model('Song', songSchema, 'songs');

export default Song;
