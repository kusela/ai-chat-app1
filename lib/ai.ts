import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Secure backend API key
});

export async function getAIResponse(prompt: string) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OpenAI API Key. Check .env.local.");
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error("No response received from OpenAI.");
    }

    return response.choices[0]?.message?.content || "No response";
  } catch (error: any) {
    console.error("🔴 OpenAI API Error:", error);
    return `Error: ${error.message}`;
  }
}
