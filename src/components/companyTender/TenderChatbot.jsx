import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, Loader, RefreshCw } from 'lucide-react';
import axios from 'axios';
import PropTypes from 'prop-types';

const TenderChatbot = ({ userType = 'company' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastError, setLastError] = useState(null);
  const messagesEndRef = useRef(null);

  // Initial greeting based on user type
  useEffect(() => {
    const initialMessage = userType === 'company' 
      ? "Hello! I'm your tender management assistant. How can I help you manage your construction tenders today?"
      : "Hello! I'm your tender assistant. How can I help you find and bid on construction opportunities today?";
      
    setMessages([{
      role: 'assistant',
      content: initialMessage,
      timestamp: new Date()
    }]);
  }, [userType]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  // Function to retry the last failed message
  const retryLastMessage = () => {
    if (!lastError) return;
    
    // Find the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex(msg => msg.role === 'user');
    if (lastUserMessageIndex === -1) return;
    
    const lastUserMessage = messages[messages.length - 1 - lastUserMessageIndex];
    
    // Remove the error message
    setMessages(prevMessages => prevMessages.filter(msg => !msg.isError));
    
    // Process the message again
    handleSendMessage(lastUserMessage.content);
    
    // Clear the error state
    setLastError(null);
  };

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = { 
      role: 'user', 
      content: content, 
      timestamp: new Date() 
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setLastError(null);

    try {
      // Create a timeout for the request
      const source = axios.CancelToken.source();
      const timeout = setTimeout(() => {
        source.cancel('Request timed out');
      }, 45000); // Increased from 25000

      // Call our secure edge function
      const response = await axios.post('/api/chat', {
        messages: messages.concat(userMessage).map(msg => ({ 
          role: msg.role, 
          content: msg.content 
        })),
        userType
      }, {
        cancelToken: source.token,
        timeout: 45000 // Increased from 25000
      });

      // Clear the timeout
      clearTimeout(timeout);

      const assistantMessage = {
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date()
      };

      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error with chat request:', error);
      
      // Store the error for potential retry
      setLastError(error);
      
      // Create more detailed error message
      let errorMessage = "I'm having trouble connecting right now. Please try again later.";
      
      if (error.response) {
        console.error('Response error data:', error.response.data);
        console.error('Response status:', error.response.status);
        
        // Custom error message based on status code
        if (error.response.status === 504) {
          errorMessage = "The server took too long to respond. This might be due to high traffic or complex queries.";
        } else if (error.response.status === 500) {
          errorMessage = "There was a server error processing your request. Our team has been notified.";
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        errorMessage = "No response received from the server. Please check your internet connection.";
      } else if (error.message.includes('timeout')) {
        console.error('Request timed out');
        errorMessage = "Your request timed out. The server might be experiencing high traffic.";
      }
      
      // Add error message with retry option
      setMessages(prevMessages => [
        ...prevMessages,
        {
          role: 'assistant',
          content: errorMessage,
          timestamp: new Date(),
          isError: true
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    handleSendMessage(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-yellow-500 text-white p-4 rounded-full shadow-lg 
          hover:bg-yellow-600 transition-colors duration-200 z-50"
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 
      transition-all duration-300 ${isMinimized ? 'h-14' : 'h-[600px]'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-yellow-500 rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <Bot className="w-6 h-6" />
          <h3 className="font-semibold">Tender Assistant</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-yellow-600 rounded-lg transition-colors"
            aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
          >
            {isMinimized ? 
              <Maximize2 className="w-5 h-5 text-white" /> : 
              <Minimize2 className="w-5 h-5 text-white" />
            }
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-yellow-600 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Container */}
          <div className="h-[472px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-yellow-500 text-white' 
                    : message.isError 
                      ? 'bg-red-100 text-red-800 border border-red-300' 
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs opacity-75">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    
                    {/* Retry button for error messages */}
                    {message.isError && (
                      <button 
                        onClick={retryLastMessage}
                        className="text-xs flex items-center gap-1 text-red-700 hover:text-red-900"
                        aria-label="Retry message"
                      >
                        <RefreshCw className="w-3 h-3" /> Retry
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                  <div className="flex space-x-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border-gray-300 focus:ring-yellow-500 
                  focus:border-yellow-500 text-sm p-2"
                disabled={isTyping}
                aria-label="Chat message input"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 
                  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                {isTyping ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

TenderChatbot.propTypes = {
  userType: PropTypes.oneOf(['company', 'client'])
};

export default TenderChatbot;