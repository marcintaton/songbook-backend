import { Express } from 'express';
import songs from '@src/routes/songs';
import metadatas from '@src/routes/metadatas';

export default function setupAppRoutes(server: Express) {
  server.use('/songs', songs);
  server.use('/metadata', metadatas);
}
