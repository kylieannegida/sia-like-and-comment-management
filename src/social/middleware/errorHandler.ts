import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import { CustomError } from "../utils/CustomError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logging.error(err.message);

  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
    },
  });
}

