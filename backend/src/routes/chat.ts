import { Router } from "express";

import { askPortfolioAI } from "../services/ollama.service.js";

const router = Router();

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

    if (
      !message ||
      typeof message !== "string"
    ) {

      return res.status(400).json({
        error: "Message is required"
      });

    }

    console.log("AI question:", message);

    const response = await askPortfolioAI(message);

    return res.json({
      response
    });

  } catch (error) {

    console.error(
      "Portfolio AI error:",
      error
    );

    return res.status(500).json({

      error:
        "Unable to generate AI response. Please make sure Ollama is running.",

      details:
        error instanceof Error
          ? error.message
          : String(error)

    });

  }

});

export default router;