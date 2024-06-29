import express from "express";
import {
  decode,
  encode,
  getStats,
} from "../controllers/shortLinkController.js";

const router = express.Router();

router.post("/encode-url", encode);

router.post("/decode-url", decode);

router.get("/statistic", getStats);

export default router;
