import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

console.log("Loaded OpenAI key:", process.env.OPENAI_API_KEY ? "YES" : "NO");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-worksheet", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const text = completion.choices[0].message.content;
    // Split by new lines and filter out empty lines to get questions list
    const questions = text.split("\n").filter(line => line.trim() !== "");

    res.json({ questions });
  } catch (error) {
    console.error("Error generating worksheet:", error);
    res.status(500).json({ error: "Failed to generate worksheet." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
