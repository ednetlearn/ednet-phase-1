import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-worksheet", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
    });

    const text = completion.choices[0].message.content;

    const questions = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate worksheet" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
