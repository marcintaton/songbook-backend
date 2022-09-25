import { Express } from 'express';
import songs from '@src/routes/songs';
import tags from '@src/routes/tags';

export default function setupAppRoutes(server: Express) {
  server.use('/songs', songs);
  server.use('/tags', tags);
}
