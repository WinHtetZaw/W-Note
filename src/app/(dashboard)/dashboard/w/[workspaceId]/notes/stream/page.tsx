"use client";

import { useState } from "react";

export default function Page() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  async function handleSummarize() {
    setSummary("");
    setLoading(true);

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      if (!response.body) {
        throw new Error("Response body is missing");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        const text = decoder.decode(value, {
          stream: true,
        });

        setSummary((previous) => previous + text);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>test</h3>
      <textarea
        className="block w-full bg-violet-500/20 h-40"
        placeholder="enter text"
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="button" onClick={handleSummarize} disabled={loading}>
        {loading ? "Generating..." : "Summarize"}
      </button>

      <div className="mt-4">{summary}</div>
    </div>
  );
}
