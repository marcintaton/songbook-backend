import express, { Express } from 'express';
import cors from 'cors';
import helmet, { contentSecurityPolicy } from 'helmet';
import compression from 'compression';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import setupPassport from '@src/auth/passport.config';

export default function setupMiddleware(server: Express) {
  server.use(express.json());

  server.use(
    // cors()
    cors({
      origin: [
        'https://oazaspiewnik.netlify.app',
        'http://localhost:6001',
        'https://oazaspiewnik.vercel.app/',
      ],
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
          'https://oazaspiewnik.vercel.app/',
        ],
      },
    })
  );
  server.use(compression());

  const MongoDBStore = connectMongoDBSession(session);

  server.use(
    session({
      secret: process.env.SESSION_SECRET || '',
      cookie: {
        maxAge: 60 * 60 * 24 * 7 * 52,
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: process.env.NODE_ENV !== 'development',
        path: '/',
        sameSite: 'lax',
        domain:
          process.env.NODE_ENV === 'development' ? 'localhost' : `railway.app`,
      },
      store: new MongoDBStore({
        uri: `mongodb+srv://admin:${process.env.DB_PASSWORD}@songbook.s3sbnxb.mongodb.net/?retryWrites=true&w=majority`,
        collection: 'sessions',
        databaseName: 'songbook',
      }),
      resave: false,
      saveUninitialized: false,
      unset: 'destroy',
    })
  );

  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(passport.initialize());
  server.use(passport.session());
  setupPassport();
}
