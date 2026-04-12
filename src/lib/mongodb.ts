import mongoose, { Mongoose } from "mongoose";

const getMongoUri = () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Please define MONGODB_URI in .env or .env.local.\n" +
        "Example: MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/bitzer",
    );
  }
  return uri;
};

/**
 * Singleton cache — reuse connection across hot-reloads in development.
 * In production, each serverless function invocation gets its own module
 * scope, so we store the promise on `globalThis` to avoid reconnecting
 * on every request.
 */
declare global {
  var _mongooseCache: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null };
}

const cache = global._mongooseCache;

export async function connectDB(): Promise<Mongoose> {
  const mongoUri = getMongoUri();

  // Return existing connection if available
  if (cache.conn) return cache.conn;

  // Reuse in-flight promise to avoid parallel connections
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(mongoUri, {
        bufferCommands: false, // fail fast instead of queuing
        maxPoolSize: 10, // max concurrent connections
        serverSelectionTimeoutMS: 5_000,
        socketTimeoutMS: 45_000,
      })
      .then((m) => {
        console.log("✅ MongoDB connected");
        return m;
      })
      .catch((err) => {
        cache.promise = null; // allow retry on next call
        throw err;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

/**
 * Helper: disconnect (useful in tests / scripts)
 */
export async function disconnectDB(): Promise<void> {
  if (cache.conn) {
    await cache.conn.disconnect();
    cache.conn = null;
    cache.promise = null;
  }
}
