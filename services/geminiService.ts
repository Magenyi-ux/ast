
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getExplanation = async (topic: string, question: string, steps: string[]) => {
  try {
    const prompt = `You are a helpful Nigerian Secondary School Math Teacher.
    Topic: ${topic}
    Question: ${question}
    Logical Steps provided by our engine: ${steps.join(' -> ')}
    
    Explain these steps in a very simple, encouraging way for a student. Use local context if applicable (e.g. sharing items). 
    Keep it concise. Avoid high-level jargon. Ensure you stick to the logic provided.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error('Gemini Error:', error);
    return 'I am sorry, I am currently offline or unable to reach the AI assistant. Please rely on the logical steps provided above.';
  }
};
