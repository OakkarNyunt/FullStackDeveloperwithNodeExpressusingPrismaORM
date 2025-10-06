import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
// import morgan = require("morgan");
import rateLimit from "express-rate-limit";
import { checkMiddleware } from "./checkMiddleware";
import { Request, Response, NextFunction } from "express";
import { json } from "stream/consumers";

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  //   ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

const app = express();
const port = process.env.PORT || 4000;

interface CustomMiddleware extends Request {
  userid?: number;
}

app.use(express.json()).use(cors()).use(limiter).use(morgan("dev"));

app.get(
  "/rate-limit",
  checkMiddleware,
  (req: CustomMiddleware, res: Response) => {
    // throw new Error("error");
    res.status(200).json({
      message: "This is a rate-limited endpoint.",
      userId: req.userid,
    });
  }
);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "An Error occurs.";
  const errorCode = error.code || "Error_code";
  res.status(status).json({
    message,
    error: errorCode,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
