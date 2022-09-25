import mongoose, { Schema } from 'mongoose';

const tagsSchema = new Schema({
  name: String,
});

const Tag = mongoose.model('Tag', tagsSchema, 'tags');

export default Tag;
