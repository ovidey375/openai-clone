import OpenAI from "openai";
import { Prompt } from "../model/prompt.model.js";

let openaiClient = null;
function getOpenAIClient() {
  if (openaiClient) return openaiClient;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set. Check your .env file");
  }

  openaiClient = new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1", // ✅ OpenRouter's API endpoint
  });

  return openaiClient;
}

export const createPrompt = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.userId;

    if (
      !content ||
      typeof content !== "string" ||
      content.trim().length === 0
    ) {
      return res
        .status(400)
        .json({ message: "content (prompt text) is required" });
    }

    // 1) Save the user prompt
    const userPrompt = await Prompt.create({
      userId,
      role: "user",
      content: content.trim(),
    });

    // 2) Call OpenRouter (OpenAI-compatible)
    const client = getOpenAIClient();

    const apiResult = await client.chat.completions.create({
      model: "openai/gpt-4o-mini", // ✅ free-tier friendly model on OpenRouter
      messages: [{ role: "user", content: content.trim() }],
    });

    // 3) Extract assistant's reply
    const assistantText =
      apiResult?.choices?.[0]?.message?.content ||
      "No response returned from AI provider.";

    // 4) Save the assistant's reply
    const assistantPrompt = await Prompt.create({
      userId,
      role: "assistant",
      content: assistantText,
    });

    // 5) Send both prompts back
    return res.status(201).json({ reply: assistantText });
    // return res.status(201).json({
    //   message: "Prompt created and processed",
    //   userPrompt,
    //   assistantPrompt,
    // });
  } catch (err) {
    console.error("createPrompt error:", err?.message || err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err?.message });
  }
};
