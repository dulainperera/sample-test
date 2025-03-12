import { useState, useEffect } from 'react';
import ClientNavbar from '../../components/ClientNavbar';
import CostCalculator from '../../components/Insights/CostCalculator';
import ContractorsList from '../../components/Insights/ContractorsList';
import BidTrends from '../../components/Insights/BidTrends';
import ProjectTimeline from '../../components/Insights/ProjectTimeline';

const ClientInsights = () => {
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
    <div className="flex min-h-screen">
      <ClientNavbar />
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarMinimized ? 'ml-20' : 'ml-80'
      }`}>
        <div className="container mx-auto p-4">
        <div className="flex items-center gap-4 mb-6">
  <h1 className="text-3xl font-bold text-gray-900">
    
    <span className="text-yellow-500"> Project Insights</span>
  </h1>
  <div className="h-1 flex-grow bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full" />
</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CostCalculator />
            <ContractorsList />
            <BidTrends />
            <ProjectTimeline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInsights;