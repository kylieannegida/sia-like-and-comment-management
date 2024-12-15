import { Request, Response, NextFunction } from "express";

const setCorsHeaders = (res: Response, origin: string | undefined) => {
  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
};

const handlePreflightRequest = (res: Response) => {
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.sendStatus(204);
};

export function corsHandler(req: Request, res: Response, next: NextFunction) {
  setCorsHeaders(res, req.header("origin"));

  if (req.method === "OPTIONS") {
    handlePreflightRequest(res);
    return;
  }

  next();
}

