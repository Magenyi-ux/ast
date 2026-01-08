
import { GoogleGenAI } from "@google/genai";

/**
 * Guideline: Create a new GoogleGenAI instance right before making an API call
 * to ensure it always uses the most up-to-date API key.
 */

export const getExplanation = async (topic: string, question: string, steps: string[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `You are a helpful Nigerian Secondary School Math Teacher.
    Topic: ${topic}
    Question: ${question}
    Logical Steps provided by our engine: ${steps.join(' -> ')}
    
    Explain these steps in a very simple, encouraging way for a student. Use local context if applicable (e.g. sharing items). 
    Keep it concise. Avoid high-level jargon. Ensure you stick to the logic provided.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Complex Text Tasks
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error('Gemini Text Error:', error);
    return 'I am sorry, I am currently unable to reach the teacher. Please follow the steps above.';
  }
};

export const generateVisualAid = async (topic: string, subTopic: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Create a clean, educational mathematical diagram or illustration for a JSS1 student. 
    Topic: ${topic}. 
    Sub-topic: ${subTopic}. 
    Style: Minimalist, whiteboard style, high contrast, clear labels, professional educational illustration. 
    Do not include excessive text, focus on the visual representation.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
    });

    /**
     * Guideline: Iterate through all parts to find the image part
     */
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error('Gemini Image Error:', error);
    return null;
  }
};
