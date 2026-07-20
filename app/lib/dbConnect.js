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

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        dbName: "Meals", // <-- forces the database, no matter what's in the URI
      })
      .then((mongooseInstance) => {
        console.log("Successfully connected to MongoDB server");
        console.log("Using database:", mongooseInstance.connection.name);
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