import express from "express";
import Registration from "../models/registration.model.js";
import { Parser } from "json2csv";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json({ registrations: registrations, count: registrations.length });
  } catch (error) {
    console.error("Erro ao listar inscrições:", error);
    res.status(500).send("Erro ao processar a solicitação.");
  }
});

router.get("/csv", async (req, res) => {
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

router.post("/", async (req, res) => {
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

export default router;
