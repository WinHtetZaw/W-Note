import { AI_PROVIDERS, AI_REQUEST_TYPES } from "../constants/ai.constants";

export type AIProvider = (typeof AI_PROVIDERS)[number];

export type AIRequestType = (typeof AI_REQUEST_TYPES)[number];

export type GenerateTextInput = {
  prompt: string;
  maxOutputTokens?: number;
};

export type GenerateTextResult = {
  text: string;
  inputTokens?: number;
  outputTokens?: number;
};

export type AIRequestInput = {
  summarize_note: {
    content: string;
  };

  generate_title: {
    content: string;
  };

  improve_writing: {
    content: string;
  };

  rewrite_text: {
    text: string;
    instruction: string;
  };

  ask_note: {
    content: string;
    question: string;
  };
};
