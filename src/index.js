import mongoose from "mongoose";
import express from "express";
import config from "./config/config.js";
import Registration from "./models/registration.model.js";
import helmet from "helmet";
import cors from "cors";
import { Parser } from "json2csv";

import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./docs/swaggerConfig.js";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.options("*", cors());

app.use("/v1/api/swagger/", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.get("/v1/api/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json({ registrations: registrations, count: registrations.length });
  } catch (error) {
    console.error("Erro ao listar inscrições:", error);
    res.status(500).send("Erro ao processar a solicitação.");
  }
});

app.get("/v1/api/registrations/csv", async (req, res) => {
  try {
    const registrations = await Registration.find().lean();

    const keysToFilter = {
      _id: true,
      __v: true,
      updatedAt: true,
    };

    const fields = Object.keys(Registration.schema.paths).filter(
      (field) => !keysToFilter[field]
    );

    const transformedRegistrations = registrations.map((registration) => {
      const dateRegistration = new Date(registration.createdAt);
      const dateOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Sao_Paulo",
      };

      return {
        ...registration,
        createdAt: dateRegistration.toLocaleDateString("pt-BR", dateOptions),
      };
    });

    res.header("Content-Type", "text/csv");
    res.attachment("registrations.csv");

    const opts = { fields };

    const parser = new Parser(opts);
    const csv = parser.parse(transformedRegistrations);

    res.send(csv);
  } catch (error) {
    console.error("Erro ao listar inscrições:", error);
    res.status(500).send("Erro ao processar a solicitação.");
  }
});

app.post("/v1/api/registrations", async (req, res) => {
  try {
    const newRegistration = new Registration({
      ...req.body,
    });

    const savedRegistration = await newRegistration.save();

    res.status(201).json(savedRegistration);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      res.status(400).json({ errors });
    } else {
      console.error("Erro ao salvar inscrição:", error);
      res.status(500).send("Erro ao processar a solicitação.");
    }
  }
});

const mongodbUri = `${config.mongodbUrl}${config.mongodbDatabase}`;
const mongodbOptions = {
  autoCreate: true,
};

let server;
mongoose.connect(mongodbUri, mongodbOptions).then(() => {
  console.log("Connected to MongoDB!");
  server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
  });
});

//mongoose.connection.close();
