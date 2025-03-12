import React, { useState, useEffect } from "react";
import { Search, MoreVertical, CheckCheck, Send } from "lucide-react";
import ClientNavbar from '../../components/ClientNavbar';

const chats = [
  {
    name: "Lanka Constructions",
    message: "Hello, I'd like to discuss the project requirements.",
    time: "10:30 AM",
    date: "Today"
  },
  // Add more chat data as needed
];

export default function ContactsClient() {
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [message, setMessage] = useState("");
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  useEffect(() => {
    const handleSidebarStateChange = (event) => {
      setIsSidebarMinimized(event.detail);
    };
    
    window.addEventListener('sidebarStateChange', handleSidebarStateChange);
    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarStateChange);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <ClientNavbar />
      <div 
        className={`flex-1 transition-all duration-300 ${
          isSidebarMinimized ? 'ml-20' : 'ml-80'
        }`}
      >
        <div className="h-full flex">
          <div className="flex-1 flex">
          <div className="w-[350px] border-r flex flex-col bg-yellow-400">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold text-white">Chats</h2>
                <Search className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 overflow-y-auto">
                {chats.map((chat, index) => (
                  <div
                    key={index}
                    className={`p-3 border-b flex justify-between cursor-pointer hover:bg-yellow-400 bg-white ${
                      selectedChat.name === chat.name ? "bg-yellow-300" : ""
                    }`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                      <p className="text-sm text-gray-600">{chat.message}</p>
                    </div>
                    <span className="text-sm text-gray-500">{chat.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-4 bg-yellow-500 border-b">
                <h2 className="text-xl font-semibold text-white">{selectedChat.name}</h2>
                <MoreVertical className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 flex flex-col justify-end p-4 bg-white">
                <div className="text-center text-gray-500 text-sm mb-2">{selectedChat.date}</div>
                <div className="flex flex-col">
                  <div className="bg-white p-2 rounded-lg self-end mb-2 max-w-xs shadow-md">
                    <p>{selectedChat.message}</p>
                    <span className="text-xs text-gray-600 flex justify-end">
                      {selectedChat.time} <CheckCheck className="w-4 h-4 text-gray-500 inline" />
                    </span>
                  </div>
                  <div className="bg-gray-200 p-2 rounded-lg self-start mb-2 max-w-xs shadow-md">
                    <p>We would love to assist you with that!</p>
                    <span className="text-xs text-gray-600 flex justify-end">{selectedChat.time}</span>
                  </div>
                </div>
              </div>
              {/* Typing Input */}
              <div className="p-4 border-t flex items-center bg-white">
                <input
                  type="text"
                                   className="flex-1 p-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                  <button className="ml-2 p-2 bg-yellow-500 rounded-lg text-black hover:bg-yellow-400">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}