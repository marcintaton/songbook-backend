import express, { Express } from 'express';
import cors from 'cors';
import helmet, { contentSecurityPolicy } from 'helmet';
import compression from 'compression';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import setupPassport from '@src/auth/passport.config';
import config from 'config';

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

  const MongoDBStore = connectMongoDBSession(session);

  server.use(
    session({
      secret: process.env.SESSION_SECRET || '',
      // cookie: {
      //   maxAge: 3600000,
      //   httpOnly: false,
      //   secure: false,
      // },
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
