import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const MONGODB_URL = process.env.MONGODB_URL;

  if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is missing");
  }

  // If already connected, return the cached connection
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection is already being created, wait for it
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL)
      .then((mongooseInstance) => {
        console.log("Successfully connected to MongoDB server");
        return mongooseInstance;
      })
      .catch((err) => {
        console.log("MongoDB connection error:", err.message);
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
