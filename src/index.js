import mongoose from "mongoose";
import cron from "node-cron";
import axios from "axios";
import config from "./config/config.js";
import app from "./app.js";

// MongoDB
const mongodbUri = `${config.mongodbUrl}${config.mongodbDatabase}?retryWrites=true&w=majority&ssl=true&authSource=admin`;
const mongodbOptions = { autoCreate: true };

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(mongodbUri, mongodbOptions).then(() => {
    console.log("Connected to MongoDB!");
    app.listen(config.port, () => {
      console.log(`Listening on port ${config.port}`);
      console.log(`API running at http://localhost:${config.port}`);
    });
  });

  // Cron de 14 minutos para health check
  cron.schedule("*/14 * * * *", async () => {
    console.log("Checking API and MongoDB health...");

    try {
      const res = await axios.get(
        `${config.baseUrl}/v1/api/health`
      );
      console.log("API is healthy:", res?.data);

      if (mongoose.connection.readyState === 1) {
        const ping = await mongoose.connection.db.admin().ping();
        console.log("MongoDB is healthy:", ping);
      } else {
        console.error("MongoDB not connected, skipping ping");
      }
    } catch (error) {
      console.error("Error checking API health", error?.message);
    }
  });
}

export default app;
