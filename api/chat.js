// Vercel Edge Function for Gemini API - Simplified to avoid timeouts
export default async function handler(req) {
  console.log('Handler started');
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed, use POST' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Quick API key check
    if (!process.env.GEMINI_API_KEY) {
      console.error('Missing GEMINI_API_KEY environment variable');
      return new Response(JSON.stringify({ 
        error: 'Configuration error', 
        details: 'API key is not configured properly' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse request
    const { messages, userType } = await req.json();
    
    // Validate request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid request format', details: 'Messages array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get only the last user message to minimize processing
    const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user') || messages[messages.length - 1];
    
    // Create a brief system prompt
    const systemPrompt = userType === 'company' 
      ? "You are a tender management assistant for a construction company. Keep responses brief but helpful."
      : "You are a tender assistant for construction clients. Keep responses brief but helpful.";
    
    // Set a strict timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('Aborting API request due to timeout');
      controller.abort();
    }, 20000); // 20 seconds max for API call
    
    try {
      // Make API call with minimal data
      console.log('Making optimized API call');
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: systemPrompt }] },
            { role: 'user', parts: [{ text: lastUserMessage.content }] }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 250, // Short responses to avoid timeouts
            topP: 0.95,
            topK: 40
          }
        })
      });
      
      // Clear timeout since we got a response
      clearTimeout(timeoutId);
      console.log('API response received');
      
      // Handle non-OK responses
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error: ${response.status}`, errorText);
        return new Response(JSON.stringify({ 
          error: 'AI service error', 
          status: response.status,
          details: errorText
        }), {
          status: 502,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Process successful response
      const data = await response.json();
      
      // Extract text from response
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                         "I'm sorry, I couldn't generate a response at the moment.";
      
      // Return successful response
      return new Response(JSON.stringify({ message: responseText }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (fetchError) {
      // Clear timeout if there was an error
      clearTimeout(timeoutId);
      
      // Special handling for timeout errors
      if (fetchError.name === 'AbortError') {
        console.log('API request aborted due to timeout');
        return new Response(JSON.stringify({ 
          message: "I'm sorry, but I'm having trouble processing your request. Could you try asking a shorter or simpler question?" 
        }), {
          status: 200, // Return 200 with a user-friendly message instead of error
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Re-throw other errors to be caught by outer try/catch
      throw fetchError;
    }
  } catch (error) {
    console.error('Error processing request:', error);
    
    // General error handling
    return new Response(JSON.stringify({ 
      error: 'Failed to process request', 
      details: error.message || 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}