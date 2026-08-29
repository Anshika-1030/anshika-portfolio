import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRouter from "./routes/chat.js";

dotenv.config();

const app = express();

const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:4200"
  })
);

app.use(
  express.json({
    limit: "1mb"
  })
);

app.get("/", (_req, res) => {

  res.json({
    message:
      "Anshika AI Portfolio Backend is running"
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

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Backend running on port ${PORT}`
  );
});