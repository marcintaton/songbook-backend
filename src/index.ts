import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/other', (req, res) => {
  res.send('Hello World! other');
});

app.listen(3001, () => {
  console.log(`Server running on 3001`);
});
