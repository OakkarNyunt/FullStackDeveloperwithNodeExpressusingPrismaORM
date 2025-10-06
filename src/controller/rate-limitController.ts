import { Request, Response, NextFunction } from "express";

interface CustomMiddleware extends Request {
  userid?: number;
}

export const rateLimitController = (
  req: CustomMiddleware,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    message: "This is a rate-limited endpoint.",
    userId: req.userid,
  });
};
