// Vercel Edge Function for Gemini API
export default async function handler(req) {
  if (req.method !== 'POST') {
    return methodNotAllowedResponse();
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error('Missing GEMINI_API_KEY environment variable');
      return configurationErrorResponse();
    }

    const { messages, userType } = await req.json();

    if (!isValidRequest(messages)) {
      return invalidRequestResponse();
    }

    const systemPrompt = createSystemPrompt(userType);
    const limitedHistory = formatConversationHistory(messages);
    const apiUrl = createApiUrl();

    console.log('Calling Gemini API...');
    const response = await callGeminiApi(apiUrl, systemPrompt, limitedHistory);

    return await handleApiResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

function methodNotAllowedResponse() {
  return new Response(JSON.stringify({ error: 'Method not allowed, use POST' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}

function configurationErrorResponse() {
  return new Response(JSON.stringify({ 
    error: 'Configuration error', 
    details: 'API key is not configured properly' 
  }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}

function isValidRequest(messages) {
  return messages && Array.isArray(messages) && messages.length > 0;
}

function invalidRequestResponse() {
  return new Response(JSON.stringify({ error: 'Invalid request format', details: 'Messages array is required' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  });
}

function createSystemPrompt(userType) {
  return userType === 'company' 
    ? `You are an AI assistant for a construction company that manages tenders.
       Help users manage their tender submissions, track active bids, and analyze performance metrics.
       Be professional and knowledgeable about the construction tender process from a company's perspective.
       Provide specific examples and actionable advice when possible.
       Keep your responses concise, practical, and focused on tender management.`
    : `You are an AI assistant for clients looking for construction services.
       Help users find suitable tenders, understand bidding processes, and navigate construction opportunities.
       Focus on helping clients find the right projects and submit competitive bids.
       Provide specific examples and actionable advice when possible.
       Keep your responses concise, practical, and focused on finding and managing construction tenders.`;
}

function formatConversationHistory(messages) {
  const conversationHistory = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
  return conversationHistory.slice(-10);
}

function createApiUrl() {
  return `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;
}

async function callGeminiApi(apiUrl, systemPrompt, limitedHistory) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 40000); // Increased from 25000

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          ...limitedHistory
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
          topP: 0.95,
          topK: 40
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
        ]
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function handleApiResponse(response) {
  console.log("API response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Gemini API HTTP error ${response.status}:`, errorText);
    return new Response(JSON.stringify({ 
      error: 'AI service error', 
      status: response.status,
      details: errorText
    }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const data = await response.json();

  if (data.error) {
    console.error('Gemini API error:', data.error);
    return new Response(JSON.stringify({ 
      error: 'AI service error', 
      details: data.error.message || 'Unknown AI service error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let responseText;
  try {
    responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      console.warn('Empty or missing response from Gemini API:', data);
      responseText = "I'm sorry, I couldn't generate a response at the moment.";
    }
  } catch (error) {
    console.error('Error extracting response text:', error, data);
    responseText = "I'm sorry, I encountered an unexpected response format.";
  }

  return new Response(JSON.stringify({ message: responseText }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

function handleError(error) {
  if (error.name === 'AbortError') {
    console.error('Request timed out:', error);
    return new Response(JSON.stringify({ 
      error: 'Request timed out', 
      details: 'The AI service took too long to respond'
    }), {
      status: 504,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  console.error('Error processing request:', error);
  return new Response(JSON.stringify({ 
    error: 'Failed to process request', 
    details: error.message || 'Unknown error'
  }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}