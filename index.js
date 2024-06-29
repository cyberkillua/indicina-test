import express from "express";
import helmet from "helmet";
import noCache from "nocache";
import cors from "cors";
import "dotenv/config";
import {
  notFoundHandler,
  errorHandler,
} from "./src/middleware/error.middleware.js";

const app = express();
app.use(cors());
app.use(noCache());
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.end("Works!!");
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 4545;

app.listen(PORT, () => {
  console.log(`🚨 Server is listening at http://localhost:${PORT}`);
});
