"use server";

import { financialQuestionAnswering } from "@/ai/flows/financial-question-answering";
import { z } from "zod";

const FormSchema = z.object({
    question: z.string(),
    financialSituation: z.string().optional(),
    emotionalState: z.string().optional(),
});

export async function askFinancialQuestion(prevState: any, formData: FormData) {
    const validatedFields = FormSchema.safeParse({
        question: formData.get('question'),
        financialSituation: formData.get('financialSituation'),
        emotionalState: formData.get('emotionalState'),
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            error: "Invalid input. Please check your question.",
        };
    }

    try {
        const result = await financialQuestionAnswering(validatedFields.data);
        return {
            ...prevState,
            answer: result,
            error: null,
        };
    } catch (error) {
        return {
            ...prevState,
            error: "An error occurred while getting your answer. Please try again.",
        };
    }
}
