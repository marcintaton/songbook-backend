import mongoose from 'mongoose';

export default function setupDB() {
  mongoose.connect(
    `mongodb+srv://admin:${process.env.DB_PASSWORD}@songbook.s3sbnxb.mongodb.net/?retryWrites=true&w=majority`,
    { dbName: 'songbook' }
  );

  mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
  );
}
