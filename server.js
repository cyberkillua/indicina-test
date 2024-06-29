import app from "./index.js";

const PORT = process.env.PORT || 4545;

app.listen(PORT, () => {
  console.log(`🚨 Server is listening at http://localhost:${PORT}`);
});
