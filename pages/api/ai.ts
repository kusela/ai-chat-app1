import { NextApiRequest, NextApiResponse } from "next";

// ✅ Ensure API Key is loaded from .env.local
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    console.log("🔵 Sending request to Google Gemini with prompt:", prompt);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    // ✅ Handle API response properly
    if (!data || !data.candidates || data.candidates.length === 0) {
      throw new Error("No valid response received from Google Gemini.");
    }

    // ✅ Extract the AI's response
    const aiResponse = data.candidates[0]?.content?.parts[0]?.text || "No response";

    console.log("🟢 Gemini AI Response:", aiResponse);

    return res.status(200).json({ text: aiResponse });
  } catch (error: any) {
    console.error("🔴 Gemini API Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
