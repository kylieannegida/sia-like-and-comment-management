import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import logging from "./logging";

const logError = (message: string, error?: Error) => {
  logging.log("----------------------------------------");
  logging.log(message, error);
  logging.log("----------------------------------------");
};

const result = dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

if (result.error) {
  logError("Error loading .env file:", result.error);
  throw result.error;
}

export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const QA = process.env.NODE_ENV === "qa";
export const PRODUCTION = process.env.NODE_ENV === "production";

export const MONGO_DB = process.env.MONGO_DB;
export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
export const MONGO_URL = process.env.MONGO_URL;
export const MONGO_COLLECTION = process.env.MONGO_COLLECTION;

if (!MONGO_DB || !MONGO_USER || !MONGO_PASSWORD || !MONGO_URL || !MONGO_COLLECTION) {
  logError("Missing MongoDB configuration in .env file");
  throw new Error("Missing MongoDB configuration in .env file");
}

export const MONGO_OPTIONS: mongoose.ConnectOptions = {
  retryWrites: true,
  w: "majority",
  appName: MONGO_DB,
};

export const SERVER_HOSTNAME = process.env.SERVER_HOST || "localhost";
export const SERVER_PORT = parseInt(process.env.SERVER_PORT || "3000", 10);

export const JWT_SECRET = process.env.JWT_SECRET || "kmrdjljcnmhk123456789101112";

export const mongo = {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_URL,
  MONGO_COLLECTION,
  MONGO_OPTIONS,
  MONGO_CONNECTION: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_COLLECTION}`,
};

export const server = {
  SERVER_HOSTNAME,
  SERVER_PORT,
};

