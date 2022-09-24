import mongoose, { Schema } from 'mongoose';

const metadataSchema = new Schema({
  title: String,
  tags: Array,
});

const Metadata = mongoose.model('Metadata', metadataSchema, 'metadatas');

export default Metadata;
