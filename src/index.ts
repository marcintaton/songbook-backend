import * as dotenv from 'dotenv';
import express from 'express';
import helmet, { contentSecurityPolicy } from 'helmet';
import mongoose from 'mongoose';
import cors from 'cors';

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

app.use(
  // cors()
  cors({
    origin: ['https://oazaspiewnik.netlify.app/*', '*'],
    credentials: true,
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
  // helmet.contentSecurityPolicy({
  //   directives: {
  //     defaultSrc: ['*'],
  //   },
  // })
);
app.use(
  contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: [
        `https://localhost:*`,
        `'self'`,
        `https://oazaspiewnik.netlify.app/*`,
      ],
    },
  })
);

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
