// Vercel Edge Function for Gemini API
export default async function handler(req) {
  console.log('Handler started');
  if (req.method !== 'POST') {
    return methodNotAllowedResponse();
  }

  try {
    console.log('Checking API key');
    if (!process.env.GEMINI_API_KEY) {
      console.error('Missing GEMINI_API_KEY environment variable');
      return configurationErrorResponse();
    }

    console.log('Parsing request body');
    const { messages, userType } = await req.json();

    console.log('Validating request');
    if (!isValidRequest(messages)) {
      return invalidRequestResponse();
    }

    console.log('Creating system prompt');
    const systemPrompt = createSystemPrompt(userType);
    
    console.log('Formatting conversation history');
    const limitedHistory = formatConversationHistory(messages);
    
    console.log('Creating API URL');
    const apiUrl = createApiUrl();

    console.log('Calling Gemini API...');
    const response = await callGeminiApi(apiUrl, systemPrompt, limitedHistory);

    console.log('Processing API response');
    return await handleApiResponse(response);
  } catch (error) {
    console.log('Handler caught error:', error.message);
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
  // Reduce to just 5 messages to reduce payload size
  return conversationHistory.slice(-5);
}

function createApiUrl() {
  return `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;
}

async function callGeminiApi(apiUrl, systemPrompt, limitedHistory) {
  console.log('Starting Gemini API call');
  
  try {
    // Set a timeout using Promise.race instead of AbortController
    const fetchPromise = fetch(apiUrl, {
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
          maxOutputTokens: 600, // Reduced from 800 to get faster responses
          topP: 0.95,
          topK: 40
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
        ]
      })
    });
    
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Request timeout after 50 seconds'));
      }, 50000);
    });
    
    // Race the fetch against the timeout
    console.log('Waiting for API response...');
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    console.log('API response received');
    
    return response;
  } catch (error) {
    console.error('Error in Gemini API call:', error.message);
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
  if (error.message && error.message.includes('timeout')) {
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