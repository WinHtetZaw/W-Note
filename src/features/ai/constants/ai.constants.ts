export const AI_PROVIDERS = ["groq", "gemini", "openai"] as const;

export const AI_REQUEST_TYPES = [
  "summarize_note",
  "generate_title",
  "improve_writing",
  "rewrite_text",
  "ask_note",
] as const;

export const AI_MODELS = { groq: ["openai/gpt-oss-20b"] };
