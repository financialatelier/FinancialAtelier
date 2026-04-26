import { MongoClient } from "mongodb";
import dns from "dns";

// Fix for MongoDB Atlas connection issues locally (querySrv ECONNREFUSED)
dns.setDefaultResultOrder("ipv4first");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  console.warn("Could not set custom DNS servers, using system defaults.");
}

if (!process.env.STORAGE_MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "STORAGE_MONGODB_URI"');
}

const uri = process.env.STORAGE_MONGODB_URI;
const options = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  family: 4,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch((err) => {
      console.error("MongoDB Connection Error:", err);
      global._mongoClientPromise = null;
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
