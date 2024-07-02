import env from "env-var";

const config = {
  port: env.get("PORT").required().asPortNumber(),
  mongodbUrl: env.get("MONGODB_URL").required().asUrlString(),
  mongodbDatabase: env.get("MONGODB_DATABASE").required().asString(),
};

export default config;
