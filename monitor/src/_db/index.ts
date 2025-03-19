import mongoose from "mongoose";

export class DatabaseConnection {
  private MONGO_USERNAME: string = process.env.MONGO_USERNAME || "";
  private MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || "";
  private MONGO_HOST: string = process.env.MONGO_HOST || "";
  private MONGO_PORT: number = Number(process.env.MONGO_PORT) || 27017;
  private MONGO_DATABASE: string = process.env.MONGO_DATABASE || "";
  private APP_ENV: string = process.env.APP_ENV || "development";
  private MONGO_URI: string =
    this.APP_ENV === "development"
      ? `mongodb://${this.MONGO_USERNAME}:${this.MONGO_PASSWORD}@${this.MONGO_HOST}:${this.MONGO_PORT}/${this.MONGO_DATABASE || "admin"}`
      : `mongodb://${this.MONGO_USERNAME}:${this.MONGO_PASSWORD}@${this.MONGO_HOST}:${this.MONGO_PORT}/${this.MONGO_DATABASE}?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;

  async connect(): Promise<void> {
    try {
      console.log("MONGO URI", this.MONGO_URI);
      console.log(
        `Establishing connection with ${this.MONGO_USERNAME} to ${this.MONGO_HOST} at port ${this.MONGO_PORT}...`
      );

      // Mongoose connection options
      const options: mongoose.ConnectOptions = {
        // Use the appropriate database name (defaults to "admin" in dev if not set)
        dbName:
          this.MONGO_DATABASE ||
          (this.APP_ENV === "development" ? "admin" : undefined),
      };

      // Add TLS options for non-development environments
      if (this.APP_ENV !== "development") {
        options.ssl = true; // Enable TLS
        options.tlsCAFile = "/etc/pki/tls/certs/global-bundle.pem"; // Path to CA file
        // options.sslCA = "/etc/pki/tls/certs/global-bundle.pem"; // Path to CA file
      }

      // Connect to MongoDB using Mongoose
      await mongoose.connect(this.MONGO_URI, options);
      console.log("Connection established successfully!");
    } catch (e) {
      console.error("Could not connect to DB. Error:", e);
      throw e;
    }
  }

  async createCollection(collectionName: string): Promise<void> {
    try {
      // With Mongoose, collections are created implicitly when you define a model and insert data.
      // However, we can check existence and create explicitly if needed.
      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();
      const collectionExists = collections.some(
        (col) => col.name === collectionName
      );

      if (!collectionExists) {
        // Mongoose doesn't have a direct createCollection method like MongoClient,
        // so we use the underlying connection's db object
        await mongoose.connection.db.createCollection(collectionName);
        console.log(`Collection ${collectionName} created successfully!`);
      } else {
        console.log(`Collection ${collectionName} already exists.`);
      }
    } catch (e) {
      console.error("Error in createCollection:", e);
      throw e;
    }
  }

  async closeConnection(): Promise<void> {
    try {
      if (mongoose.connection.readyState !== 0) {
        // 0 = disconnected
        console.log("Closing DB connection...");
        await mongoose.connection.close();
        console.log("DB Connection closed.");
      }
    } catch (e) {
      console.error("Error in closeConnection:", e);
      throw e;
    }
  }
}

// Usage Example
// (async () => {
//   const database = new DatabaseConnection();
//   try {
//     await database.connect();
//     const COLLECTION_NAME = "test_collection";
//     await database.createCollection(COLLECTION_NAME);
//     await database.closeConnection();
//   } catch (error) {
//     console.error("Error in execution:", error);
//   }
// })();
