import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.listen(3001, () => {
  console.log(`Server running on 3001`);
});
