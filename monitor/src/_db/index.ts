import { MongoClient, Db } from "mongodb";

export class DatabaseConnection {
  private MONGO_USERNAME: string = process.env.MONGO_USERNAME || "";
  private MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || "";
  private MONGO_HOST: string = process.env.MONGO_HOST || "";
  private MONGO_PORT: number = Number(process.env.MONGO_PORT) || 27017;
  private MONGO_DATABASE: string = process.env.MONGO_DATABASE || "test";
  private APP_ENV: string = process.env.APP_ENV || "development";
  private MONGO_URI: string =
    this.APP_ENV === "development"
      ? `mongodb://${this.MONGO_USERNAME}:${this.MONGO_PASSWORD}@${this.MONGO_HOST}:${this.MONGO_PORT}/${this.MONGO_DATABASE}`
      : `mongodb://${this.MONGO_USERNAME}:${this.MONGO_PASSWORD}@${this.MONGO_HOST}:${this.MONGO_PORT}/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;
  private db: Db | null = null;
  private client: MongoClient | null = null;

  async connect(): Promise<void> {
    try {
      // console.log('MONGO_URI', MONGO_URI);

      console.log("ENV VARIABLES", process.env);
      console.log(
        `Establishing connection with ${this.MONGO_USERNAME} to ${this.MONGO_HOST} at port ${this.MONGO_PORT}...`
      );
      this.client = new MongoClient(this.MONGO_URI, {
        ...(this.APP_ENV !== "development" && {
          tlsCAFile: "/etc/pki/tls/certs/global-bundle.pem",
        }),
      });
      await this.client.connect();
      console.log("Connection established successfully!");
      this.db = this.client.db(this.MONGO_DATABASE);
    } catch (e) {
      console.error("Could not connect to DB. Error:", e);
      throw e;
    }
  }

  async createCollection(collectionName: string): Promise<void> {
    try {
      if (!this.db) {
        console.error("No database connection established.");
        return;
      }
      const collections = await this.db.listCollections().toArray();
      const collectionExists = collections.some(
        (col) => col.name === collectionName
      );

      if (!collectionExists) {
        await this.db.createCollection(collectionName);
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
    if (this.client) {
      try {
        console.log("Closing DB connection...");
        await this.client.close();
        console.log("DB Connection closed.");
      } catch (e) {
        console.error("Error in closeConnection:", e);
        throw e;
      }
    }
  }
}

// Usage Example
// (async () => {
//   const database = new DatabaseConnection();

//   try {
//     // Establish a connection
//     await database.connect();

//     const COLLECTION_NAME = "test_collection";

//     // Create a collection
//     await database.createCollection(COLLECTION_NAME);

//     // Close the connection
//     await database.closeConnection();
//   } catch (error) {
//     console.error("Error in execution:", error);
//   }
// })();
