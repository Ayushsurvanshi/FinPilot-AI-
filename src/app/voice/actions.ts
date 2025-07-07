"use server";

import { voiceIntelligence } from "@/ai/flows/voice-intelligence";
import { z } from "zod";

const FormSchema = z.object({
  query: z.string(),
});

export async function processVoiceQuery(prevState: any, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      error: "Invalid query.",
    };
  }

  try {
    const result = await voiceIntelligence(validatedFields.data);
    return {
      ...prevState,
      result: result,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      ...prevState,
      error: "An error occurred while processing your request.",
    };
  }
}
