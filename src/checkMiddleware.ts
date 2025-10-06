import { Request, Response, NextFunction } from "express";

interface CustomMiddleware extends Request {
  userid?: number;
}

export const checkMiddleware = (
  req: CustomMiddleware,
  res: Response,
  next: NextFunction
) => {
  req.userid = 1461998;
  next();
};
