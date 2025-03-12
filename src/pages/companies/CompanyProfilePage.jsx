import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockCompanies } from './mockData';
import CompanyProfile from '../../components/CompanyProfile/CompanyProfile';
import ClientNavbar from '../../components/ClientNavbar';

const CompanyProfilePage = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const { id } = useParams();
  const companyId = parseInt(id, 10);
  const company = mockCompanies.find(c => c.id === companyId);

  useEffect(() => {
    const handleSidebarStateChange = (event) => {
      setIsSidebarMinimized(event.detail);
    };

    window.addEventListener('sidebarStateChange', handleSidebarStateChange);
    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarStateChange);
    };
  }, []);

  if (!company) {
    return (
      <div className="flex">
        <ClientNavbar />
        <div className={`flex-1 transition-all duration-300 ${
          isSidebarMinimized ? 'ml-20' : 'ml-80'
        } p-4`}>
          <div>Company not found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <ClientNavbar />
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarMinimized ? 'ml-20' : 'ml-80'
      }`}>
        <div className="container mx-auto p-4">
          <CompanyProfile company={company} />
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;