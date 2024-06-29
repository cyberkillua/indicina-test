import express from "express";
import helmet from "helmet";
import noCache from "nocache";
import cors from "cors";
import "dotenv/config";
import {
  notFoundHandler,
  errorHandler,
} from "./src/middleware/error.middleware.js";
import { getOriginalURL } from "./src/controllers/shortLinkController.js";
import shortLinkRoute from "./src/routes/shortLink.routes.js";

const app = express();
app.use(cors());
app.use(noCache());
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/shortlink", shortLinkRoute);

app.get("/", (_req, res) => {
  res.end("Works!!");
});

app.get("/:shortCode", (req, res) => {
  const originalURL = getOriginalURL(req.params.shortCode);
  if (originalURL) {
    res.redirect(originalURL);
  } else {
    res.status(404).send("URL not found");
  }
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 4545;

app.listen(PORT, () => {
  console.log(`🚨 Server is listening at http://localhost:${PORT}`);
});
