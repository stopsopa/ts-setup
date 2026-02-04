import express from "express";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "./config.ts";
import apiRouter from "./routes/api.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "../");
const web = join(root, "public");

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(web));

// Use the API router
app.use("/api", apiRouter);

// Basic health check
app.get("/health", (req, res) => {
  res.send("Server is up and running");
});

const { PORT, HOST } = config;

app.listen(PORT, HOST, () => {
  console.log(`
  🚀 Server is running!
  📡 URL: http://${HOST}:${PORT}
  📂 Serving static files from: ${relative(root, web)}/
  `);
});
