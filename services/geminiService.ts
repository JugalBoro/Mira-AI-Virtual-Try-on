import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MODEL_IMAGE_GEN, MODEL_CHAT } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a virtual try-on image using Gemini 2.5 Flash Image.
 * It takes the user's photo and the desired clothing description.
 */
export const generateTryOn = async (
  userImageBase64: string,
  clothingDescription: string
): Promise<string> => {
  try {
    const prompt = `
      Edit this image to show the person wearing the following item: ${clothingDescription}.
      Ensure the new clothing fits the person's body shape and pose naturally.
      Maintain the original background, face, skin tone, hair, and lighting exactly as they are.
      The output must be a high-quality, photorealistic fashion photograph.
    `;

    // Strip header if present to get raw base64 data
    const cleanBase64 = userImageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const response = await ai.models.generateContent({
      model: MODEL_IMAGE_GEN,
      contents: {
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64,
            },
          },
        ],
      },
    });

    // Extract image from response
    // The response structure for image generation usually contains the image in the parts
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image generated.");

  } catch (error) {
    console.error("Gemini Try-On Error:", error);
    throw error;
  }
};

/**
 * Generates a stylist review for the generated look.
 */
export const getStylistReview = async (
  imageBase64: string,
  productName: string
): Promise<string> => {
  try {
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const response = await ai.models.generateContent({
      model: MODEL_CHAT,
      contents: {
        parts: [
          {
            text: `You are a high-end fashion stylist for MIRRA. A user just tried on the "${productName}" virtually. 
                   Look at this photo of them. Provide a 1-2 sentence sophisticated, encouraging, and specific comment about how it fits them or how the style suits them. 
                   Be chic and positive.`
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          }
        ]
      }
    });

    return response.text || "You look absolutely stunning in this piece.";
  } catch (error) {
    console.error("Stylist Review Error:", error);
    return "A truly timeless look.";
  }
};

/**
 * Chat with the Fashion Assistant.
 */
export const sendChatMessage = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: MODEL_CHAT,
      config: {
        systemInstruction: "You are MIRRA, a high-end fashion stylist assistant. You are chic, knowledgeable, and helpful. Keep your responses concise (under 50 words unless asked for detail) and focus on style advice, color coordination, and fit.",
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I'm having a moment, darling. Could you repeat that?";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I seem to be having trouble connecting to the fashion mainframe.";
  }
};