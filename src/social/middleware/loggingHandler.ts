import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";

export function loggingHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logging.info(
    `Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logging.info(
      `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
    );
  });

  next();
}

