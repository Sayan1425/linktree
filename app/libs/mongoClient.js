
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Please add MONGODB_URI to your .env");

const client = new MongoClient(uri);

let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In dev, use a global variable to avoid multiple connections
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In prod, always create a new connection
  clientPromise = client.connect();
}

export default clientPromise;
