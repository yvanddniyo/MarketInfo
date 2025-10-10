import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGODB_URL

declare global {
  var mongooseCache : {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

let cached = global.mongooseCache;

if(!cached) {
  cached = global.mongooseCache = { conn: null, promise: null};
}

export const connectToDatabase = async():Promise<typeof mongoose> => {
  if (!MONGO_URL) throw new Error("MONGODB_URL must be set with .env")
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, { bufferCommands: false })
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
 console.log(`Connected to database ${process.env.NODE_ENV} - ${MONGO_URL}`)
 return cached.conn!
}