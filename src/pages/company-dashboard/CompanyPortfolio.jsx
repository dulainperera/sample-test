import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import CompanyNavbar from '../../components/CompanyNavbar';
import CreatePortfolioForm from './CreatePortfolioForm.jsx';

const CompanyPortfolio = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

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
    <div className="flex">
      <CompanyNavbar />
      <div 
        className={`flex-1 transition-all duration-300 ${
          isSidebarMinimized ? 'ml-20' : 'ml-80'
        }`}
      >
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="w-full max-w-4xl px-4">
            {!showCreateForm ? (
              <div className="flex flex-col items-center justify-center -mt-20">
                <div className="max-w-xl w-full text-center">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Create Your Company Portfolio
                  </h1>
                  <p className="text-gray-600 mb-8">
                    Showcase your company's expertise, past projects, and achievements to attract potential clients.
                  </p>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="inline-flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  >
                    <Plus className="w-5 h-5" />
                    Create Portfolio
                  </button>
                </div>
              </div>
            ) : (
              <CreatePortfolioForm onCancel={() => setShowCreateForm(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPortfolio;