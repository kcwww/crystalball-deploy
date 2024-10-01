import mongoose, { Connection } from 'mongoose';

let cachedConnection: Connection | null = null;

export const connectToMongoDB = async () => {
  if (cachedConnection) {
    console.log('Using cached database connection');
    return cachedConnection;
  }

  try {
    if (!process.env.MONGODB_URL) throw new Error('MONGODB_URI is not set');

    const cnx = await mongoose.connect(process.env.MONGODB_URL);
    console.log('Database connected');
    cachedConnection = cnx.connection;
    return cachedConnection;
  } catch (error) {
    console.error('Error connecting to database', error);
    throw error;
  }
};
