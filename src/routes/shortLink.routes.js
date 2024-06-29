import express from "express";
import { decode, encode } from "../controllers/shortLinkController.js";

const router = express.Router();

router.post("/encode-url", encode);

router.post("/decode-url", decode);

export default router;
