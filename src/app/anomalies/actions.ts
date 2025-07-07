"use server";

import { detectAnomalies } from "@/ai/flows/intelligent-anomaly-detection";
import { z } from "zod";

const FormSchema = z.object({
    spendingData: z.string(),
    userProfile: z.string(),
});

export async function checkForAnomalies(prevState: any, formData: FormData) {
    const validatedFields = FormSchema.safeParse({
        spendingData: formData.get('spendingData'),
        userProfile: formData.get('userProfile'),
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            error: "Invalid input. Please provide valid JSON data.",
        };
    }
    
    try {
        const result = await detectAnomalies(validatedFields.data);
        return {
            ...prevState,
            result: result,
            error: null,
        };
    } catch (error) {
        console.error(error);
        return {
            ...prevState,
            error: "An error occurred while detecting anomalies. Please try again.",
        };
    }
}
