// File: api/chat.js
// Vercel Edge Function for Gemini API

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed, use POST' });
    }
  
    try {
      // Parse request body
      const { messages, userType } = req.body;
  
      // Create system prompts based on user type
      const systemPrompt = userType === 'company' 
        ? `You are an AI assistant for a construction company that manages tenders. 
           Help users manage their tender submissions, track active bids, and analyze performance metrics. 
           Be professional and knowledgeable about the construction tender process from a company's perspective.
           The company currently has:
           - Multiple active tenders (around 10)
           - Several urgent deadlines (at least 4)
           - Various bid submissions to track
           
           Keep your responses concise, practical, and focused on tender management.
           If providing steps or options, use numbered lists.`
           
        : `You are an AI assistant for clients looking for construction services. 
           Help users find suitable tenders, understand bidding processes, and navigate construction opportunities. 
           Focus on helping clients find the right projects and submit competitive bids.
           Clients typically need help with:
           - Creating new tenders for construction projects
           - Evaluating bids from contractors
           - Understanding pricing and timelines
           - Managing the bidding process
           
           Keep your responses concise, practical, and focused on finding and managing construction tenders.
           If providing steps or options, use numbered lists.`;
  
      // Format conversation for Gemini API
      const conversationHistory = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));
  
      // Call Gemini API
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
  
      // Handle API errors
      if (data.error) {
        console.error('Gemini API error:', data.error);
        return res.status(500).json({ error: 'An error occurred with the AI service' });
      }
  
      // Extract and return the response text
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response at the moment.";
      
      // Return the assistant's response
      return res.status(200).json({ message: responseText });
    } catch (error) {
      console.error('Error processing request:', error);
      return res.status(500).json({ error: 'Failed to process request' });
    }
  }