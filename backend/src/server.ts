import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRouter from "./routes/chat.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "https://anshika-portfolio-blond.vercel.app"
    ]
  })
);

app.use(
  express.json({
    limit: "1mb"
  })
);

app.get("/", (_req, res) => {
  res.json({
    message: "Anshika AI Portfolio Backend is running"
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok"
  });
});

app.use(
  "/api/chat",
  chatRouter
);

// Local development only
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend running on port ${PORT}`);
  });
}

export default app;