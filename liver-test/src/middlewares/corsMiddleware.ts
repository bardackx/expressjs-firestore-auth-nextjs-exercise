import { NextFunction, Request, Response } from "express";

export const corsMiddleware = (
  origin: string,
): (req: Request, res: Response, next: NextFunction) => void => {
  const middleware = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

    if (req.method === "OPTIONS") {
      // Handle preflight requests (OPTIONS)
      res.sendStatus(200);
      return;
    }

    next();
  };

  return middleware;
};
