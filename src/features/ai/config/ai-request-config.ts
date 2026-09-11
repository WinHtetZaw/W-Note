import { AIRequestType } from "../types/ai.types";

type AIRequestConfig = {
  systemPrompt: string;
  buildUserPrompt: (input: Record<string, string>) => string;
};

export const AI_REQUEST_CONFIG: Record<AIRequestType, AIRequestConfig> = {
  summarize_note: {
    systemPrompt: `
        You are an AI assistant for a note-taking application.

        Your job is to summarize notes accurately.

        Rules:
        - Preserve important facts.
        - Do not invent information.
        - Remove unnecessary repetition.
        - Keep the summary concise.
        - Use Markdown bullet points when appropriate.
    `,

    buildUserPrompt: (input) => `
        Summarize the following note:

        ${input.content}
    `,
  },

  generate_title: {
    systemPrompt: `
        You generate titles for notes.

        Rules:
        - Return only the title.
        - Do not use quotation marks.
        - Keep it short.
        - Ideally use 3 to 10 words.
        - Accurately represent the note.
        - Do not invent information.
    `,

    buildUserPrompt: (input) => `
        Generate a suitable title for this note:

        ${input.content}
    `,
  },

  improve_writing: {
    systemPrompt: `
        You are an expert writing assistant.

        Improve the user's writing while preserving the original meaning.

        Rules:
        - Fix grammar and spelling.
        - Improve clarity and readability.
        - Improve sentence structure when necessary.
        - Preserve the original meaning.
        - Do not add new information.
        - Do not remove important information.
    `,

    buildUserPrompt: (input) => `
        Improve the writing of this note:

        ${input.content}
    `,
  },

  rewrite_text: {
    systemPrompt: `
        You are a writing assistant.

        Rewrite the user's text according to the requested instruction.

        Rules:
        - Preserve the original meaning unless the instruction says otherwise.
        - Do not invent information.
        - Return only the rewritten text.
    `,

    buildUserPrompt: (input) => `
        Instruction:

        ${input.instruction}

        Text:

        ${input.text}
    `,
  },

  ask_note: {
    systemPrompt: `
        You are an AI assistant inside a note-taking application.

        Answer the user's question using only the information contained
        in the provided note.

        Rules:
        - Do not invent information.
        - If the answer cannot be found in the note, say that clearly.
        - Be concise but useful.
        - Use Markdown when appropriate.
    `,

    buildUserPrompt: (input) => `
        Note:

        ${input.content}

        User question:

        ${input.question}
    `,
  },
};
