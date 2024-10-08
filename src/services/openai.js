import axios from "axios";
import { getSystemMessage } from "../utils/getSystemMessage";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const getAnswer = async (userMessages, moduleData) => {
  try {
    const systemMessage = getSystemMessage(moduleData);

    const messages = [systemMessage, ...userMessages];

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4",
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching answer:", error);
    throw error;
  }
};
