import { Express } from 'express';
import songs from '@src/routes/songs';
import tags from '@src/routes/tags';
import auth from '@src/routes/auth';

export default function setupAppRoutes(server: Express) {
  server.use('/api/auth', auth);
  server.use('/api/songs', songs);
  server.use('/api/tags', tags);
}
