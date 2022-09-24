import express, { Express } from 'express';
import cors from 'cors';
import helmet, { contentSecurityPolicy } from 'helmet';
import compression from 'compression';

export default function setupMiddleware(server: Express) {
  server.use(express.json());
  server.use(
    // cors()
    cors({
      origin: ['https://oazaspiewnik.netlify.app', 'http://localhost:6001'],
      credentials: true,
    })
  );
  server.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  server.use(
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
  server.use(compression());
}
