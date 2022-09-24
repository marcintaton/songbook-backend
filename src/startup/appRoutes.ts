import { Express } from 'express';
import songs from '@src/routes/songs';

export default function setupAppRoutes(server: Express) {
  server.use('/songs', songs);
}
