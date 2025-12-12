import { GoogleGenAI } from "@google/genai";
import { MOCK_CARS } from "../constants";

let aiClient: GoogleGenAI | null = null;

// Initialize client only when needed
const getClient = () => {
  if (!aiClient && process.env.API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const sendMessageToGemini = async (message: string, history: string[] = []): Promise<string> => {
  const client = getClient();
  
  if (!client) {
    return "L'assistant n'est pas configuré (Clé API manquante).";
  }

  // Create context about the available cars
  const carContext = MOCK_CARS.map(c => 
    `- ${c.name} (${c.category}): ${c.pricePerDay}€/jour, ${c.fuel}, ${c.transmission}, ${c.seats} places.`
  ).join('\n');

  const systemInstruction = `Tu es l'assistant virtuel de "FleeteeClone", une agence de location de voitures. 
  Ton but est d'aider les utilisateurs à choisir une voiture, expliquer les assurances, ou répondre aux questions sur le processus de réservation.
  
  Voici la liste des véhicules disponibles actuellement :
  ${carContext}
  
  Réponds de manière concise, polie et utile. Si l'utilisateur demande une recommandation, pose des questions sur ses besoins (budget, nombre de personnes, type de trajet).
  Sois bref dans tes réponses.`;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Désolé, je n'ai pas compris votre demande.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Une erreur est survenue lors de la communication avec l'assistant.";
  }
};