/* import env from "env-var";

const config = {
  port: env.get("PORT").required().asPortNumber(),
  mongodbUrl: env.get("MONGODB_URL").required().asUrlString(),
  mongodbDatabase: env.get("MONGODB_DATABASE").required().asString(),
}; */

const config = {
  port: process.env.PORT,
  mongodbUrl: process.env.MONGODB_URL,
  mongodbDatabase: process.env.MONGODB_DATABASE,
};

export default config;
