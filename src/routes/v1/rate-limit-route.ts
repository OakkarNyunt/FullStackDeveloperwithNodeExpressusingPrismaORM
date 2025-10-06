import express from "express";

import { rateLimitController } from "../../controller/rate-limitController";
import { checkMiddleware } from "../../checkMiddleware";

const router = express.Router();

router.get("/rate-limit", checkMiddleware, rateLimitController);

export default router;
