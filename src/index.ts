import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

mongoose.connect(
  `mongodb+srv://admin:${process.env.DB_PASSWORD}@songbook.s3sbnxb.mongodb.net/?retryWrites=true&w=majority`,
  { dbName: 'songbook' }
);

const songSchema = new mongoose.Schema({
  title: String,
});

const Song = mongoose.model('songs', songSchema);

// Get the default connection
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/other', async (req, res) => {
  const response = await Song.find({});
  res.send(response);
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running`);
});
