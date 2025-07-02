import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/generate-worksheet", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const text = completion.data.choices[0].message.content;
    const questions = text.split("\n").filter((line) => line.trim() !== "");

    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate worksheet." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
