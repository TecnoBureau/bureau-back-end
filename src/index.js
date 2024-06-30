import mongoose from "mongoose";
import config from "./config/config.js";

console.log(config);

const mongodbUri = `${config.mongodbUrl}${config.mongodbDatabase}`;

mongoose.connect(mongodbUri, {
  autoCreate: true,
});
console.log("Conectado ao MongoDB!");

mongoose.connection.close();
