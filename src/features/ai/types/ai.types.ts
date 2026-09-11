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
