import mongoose from "mongoose";
import express from "express";
import config from "./config/config.js";
import Registration from "./models/registration.model.js";
import helmet from "helmet";
import cors from "cors";

console.log(config);

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.options("*", cors());

app.get("/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json({ registrations: registrations, count: registrations.length });
  } catch (error) {
    console.error("Erro ao listar inscrições:", error);
    res.status(500).send("Erro ao processar a solicitação.");
  }
});

app.post("/registrations", async (req, res) => {
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
  console.log("Conectado ao MongoDB!");
  server = app.listen(config.port, () => {
    console.log(
      `Listening to port ${config.port}, http://localhost:${config.port}`
    );
  });
});

//mongoose.connection.close();
