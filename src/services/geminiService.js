const axios = require("axios");

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

async function generateSummary(book) {
  try {
    const prompt = `
You are an expert book analyst.

Generate a clear and concise summary of the following book. Use provided data and search for web about this book also.

Book Details:
Title: ${book.title}
Author: ${book.authors.join(", ")}
Description: ${book.description}
Category: ${book.categories?.join(", ")}

Instructions:
- Write a 15-20 sentence summary
- Keep it simple and easy to understand
- Highlight key themes and purpose
- Do NOT repeat the description directly
- Make it engaging

Output:
Summary:
`;

    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message);
    throw new Error("Failed to generate summary");
  }
}

module.exports = {
  generateSummary,
};