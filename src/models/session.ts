import mongoose, { Schema } from 'mongoose';

const sessionSchema = new Schema({
  _id: String,
  expires: Date,
  cookie: Object,
  passport: Object,
});

const Session = mongoose.model('Session', sessionSchema, 'sessions');

export default Session;
