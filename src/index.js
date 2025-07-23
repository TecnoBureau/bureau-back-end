import mongoose from "mongoose";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import cron from "node-cron";
import axios from "axios";
import config from "./config/config.js";
import swaggerConfig from "./docs/swaggerConfig.js";
import registrationsRouter from "./routers/registrations.router.js";
import healthRouter from "./routers/health.router.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.options("*", cors());

// Swagger
app.use("/v1/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

// Rotas
app.use("/v1/api/registrations", registrationsRouter);
app.use("/v1/api/health", healthRouter);

// MongoDB
// const mongodbUri = `${config.mongodbUrl}${config.mongodbDatabase}?retryWrites=true&w=majority&ssl=true&authSource=admin`;
const mongodbUri = `${config.mongodbUrl}${config.mongodbDatabase}`;
const mongodbOptions = { autoCreate: true };

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
