"use client";

import { useState } from "react";

const AIChat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      console.log("🟢 AI Response:", data);

      if (res.ok) {
        setResponse(data.text);
      } else {
        setResponse(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("🔴 Frontend Fetch Error:", error);
      setResponse("Error fetching AI response.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">AI Chat</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-3 border rounded-lg text-black"
          placeholder="Ask AI anything..."
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </form>

      {response && <p className="mt-4 p-4 border rounded-lg bg-gray-800">{response}</p>}
    </div>
  );
};

export default AIChat;
