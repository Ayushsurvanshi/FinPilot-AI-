// src/ai/flows/voice-intelligence.ts
'use server';
/**
 * @fileOverview A voice intelligence AI agent for financial assistance.
 *
 * - voiceIntelligence - A function that handles voice input and provides context-aware,
 *   emotionally intelligent responses.
 * - VoiceIntelligenceInput - The input type for the voiceIntelligence function.
 * - VoiceIntelligenceOutput - The return type for the voiceIntelligence function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const VoiceIntelligenceInputSchema = z.object({
  query: z.string().describe('The user query in text format.'),
});
export type VoiceIntelligenceInput = z.infer<typeof VoiceIntelligenceInputSchema>;

const VoiceIntelligenceOutputSchema = z.object({
  response: z.string().describe('The response to the user query.'),
  audioResponse: z.string().describe('The audio response to the user query in WAV format.'),
});
export type VoiceIntelligenceOutput = z.infer<typeof VoiceIntelligenceOutputSchema>;

export async function voiceIntelligence(input: VoiceIntelligenceInput): Promise<VoiceIntelligenceOutput> {
  return voiceIntelligenceFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const voiceIntelligenceFlow = ai.defineFlow(
  {
    name: 'voiceIntelligenceFlow',
    inputSchema: VoiceIntelligenceInputSchema,
    outputSchema: VoiceIntelligenceOutputSchema,
  },
  async input => {
    const { response } = await ai.generate({
      model: ai.defaultModel,
      prompt: `You are a financial assistant. Respond to the following query with helpful and context-aware advice:\n\n{{{query}}}`,
    });

    const ttsResponse = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: response.text,
    });

    if (!ttsResponse.media) {
      throw new Error('no media returned');
    }

    const audioBuffer = Buffer.from(
      ttsResponse.media.url.substring(ttsResponse.media.url.indexOf(',') + 1),
      'base64'
    );

    const audioResponse = 'data:audio/wav;base64,' + (await toWav(audioBuffer));

    return {
      response: response.text,
      audioResponse: audioResponse,
    };
  }
);
