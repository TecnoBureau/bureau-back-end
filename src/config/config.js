/* import env from "env-var";

const config = {
  baseUrl: env.get("BASE_URL").required().asUrlString(),
  port: env.get("PORT").required().asPortNumber(),
  mongodbUrl: env.get("MONGODB_URL").required().asUrlString(),
  mongodbDatabase: env.get("MONGODB_DATABASE").required().asString(),
  corsOrigin: env.get("CORS_ORIGIN").required().asUrlString(),
}; */

const config = {
  baseUrl: process.env.BASE_URL,
  port: process.env.PORT,
  mongodbUrl: process.env.MONGODB_URL,
  mongodbDatabase: process.env.MONGODB_DATABASE,
  corsOrigin: process.env.CORS_ORIGIN,
};

export default config;
