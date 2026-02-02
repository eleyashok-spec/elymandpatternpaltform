import { GoogleGenAI, Type } from "@google/genai";

export const generatePatternMetadata = async (title: string, category: string) => {
  // Always create a new GoogleGenAI instance right before making an API call 
  // to ensure it always uses the most up-to-date API key from the environment.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional, high-end design description and 5-8 relevant SEO tags for a pattern titled "${title}" in the category "${category}". Focus on technical quality and creative application.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: {
              type: Type.STRING,
              description: "A professional 2-3 sentence description of the pattern.",
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of relevant design and industry tags.",
            }
          },
          required: ["description", "tags"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response text from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini metadata generation failed:', error);
    // Return graceful fallback data
    return {
      description: "A premium, original design asset created for professional branding, apparel, and digital content projects.",
      tags: ["design", "professional", "pattern", "high-resolution", "elymand"]
    };
  }
};