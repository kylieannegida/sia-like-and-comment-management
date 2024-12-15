import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import dotenv from 'dotenv';

import logging from "./config/logging";
import { mongo, server } from "./config/config";
import routes from "./routes/routes";

import { corsHandler } from "./middleware/corsHandler";
import { loggingHandler } from "./middleware/loggingHandler";
import { errorHandler } from "./middleware/errorHandler";
import { specs } from "./config/swagger";

dotenv.config();

const app = express();

const logMessage = (message: string) => {
  logging.info("----------------------------------------");
  logging.info(message);
  logging.info("----------------------------------------");
};

async function startServer() {
  logMessage("Initializing API");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(corsHandler);
  app.use(loggingHandler);

  logMessage("Setting up Swagger UI");
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Like and Comment Management API",
    })
  );

  logMessage("Connecting to MongoDB");
  try {
    await mongoose.connect(mongo.MONGO_CONNECTION, mongo.MONGO_OPTIONS);
    logMessage("Connected to MongoDB");
  } catch (error) {
    logging.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }

  logMessage("Setting up routes");
  app.use('/api', routes);

  app.use(errorHandler);

  app.listen(server.SERVER_PORT, () => {
    logMessage(`Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`);
  });
}

startServer().catch((error) => {
  logging.error("Failed to start server:", error);
  process.exit(1);
});

