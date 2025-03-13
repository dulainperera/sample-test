// Vercel Edge Function for Gemini API
export default async function handler(req) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed, use POST' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Parse request body
    const { messages, userType } = await req.json();

    // Create system prompts based on user type
    const systemPrompt = userType === 'company' 

      ?`  You are an AI assistant for a construction company that manages tenders...` 
      : `You are an AI assistant for clients looking for construction services...`;

    // Format conversation for Gemini API
    const conversationHistory = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Call Gemini API with FIXED URL format using backticks
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            // Add system prompt as a separate user message
            {
              role: 'user',
              parts: [{ text: systemPrompt }]
            },
            ...conversationHistory
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
            topP: 0.95,
            topK: 40
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      }
    );

    const data = await response.json();

    // Add console logging for debugging
    console.log("API response status:", response.status);
    
    // Handle API errors
    if (data.error) {
      console.error('Gemini API error:', data.error);
      return new Response(JSON.stringify({ error: 'An error occurred with the AI service' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Extract and return the response text
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I'm sorry, I couldn't generate a response at the moment.";
    
    // Return the assistant's response with FIXED response format
    return new Response(JSON.stringify({ message: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}