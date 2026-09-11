"use client";

import { useState } from "react";

export function SummarizeButton({ content }: { content: string }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSummarize() {
    setSummary("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/summarize", {
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
      <button type="button" onClick={handleSummarize} disabled={loading}>
        {loading ? "Generating..." : "Summarize"}
      </button>

      <div className="mt-4">{summary}</div>
    </div>
  );
}
