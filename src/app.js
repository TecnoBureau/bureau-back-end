import express from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import config from "./config/config.js";
import swaggerConfig from "./docs/swaggerConfig.js";
import registrationsRouter from "./routers/registrations.router.js";
import healthRouter from "./routers/health.router.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.options("*", cors());

// Swagger
app.use("/v1/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

// Rotas
app.use("/v1/api/registrations", registrationsRouter);
app.use("/v1/api/health", healthRouter);

export default app; 