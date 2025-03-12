import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockCompanies } from './mockData';
import ClientNavbar from '../../components/ClientNavbar';
import Filter from '../../components/CompanyProfile/Filter';
import { Star } from 'lucide-react';

const RegisteredCompaniesPage = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState(mockCompanies);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleSidebarStateChange = (event) => {
      setIsSidebarMinimized(event.detail);
    };

    window.addEventListener('sidebarStateChange', handleSidebarStateChange);
    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarStateChange);
    };
  }, []);

  const handleFilterChange = (filters) => {
    setIsLoading(true);
    try {
      let results = mockCompanies;

      if (filters.type) {
        results = results.filter(company => company.type === filters.type);
      }

      if (filters.location) {
        results = results.filter(company => 
          company.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.rating) {
        results = results.filter(company => 
          company.rating >= parseFloat(filters.rating)
        );
      }

      if (filters.employeeSize) {
        results = results.filter(company => {
          const employeeCount = parseInt(company.employees);
          switch (filters.employeeSize) {
            case 'small': return employeeCount < 100;
            case 'medium': return employeeCount >= 100 && employeeCount <= 200;
            case 'large': return employeeCount > 200;
            default: return true;
          }
        });
      }

      if (filters.established) {
        results = results.filter(company => {
          const year = new Date(company.established).getFullYear();
          switch (filters.established) {
            case 'before2000': return year < 2000;
            case '2000to2010': return year >= 2000 && year <= 2010;
            case 'after2010': return year > 2010;
            default: return true;
          }
        });
      }

      setFilteredCompanies(results);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    
    let results = mockCompanies;
    if (query) {
      results = results.filter(company => 
        company.name.toLowerCase().includes(query)
      );
    }
    setFilteredCompanies(results);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((index) => {
          const difference = rating - index + 1;
          
          if (difference >= 1) {
            // Full star
            return (
              <Star
                key={index}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
              />
            );
          } else if (difference > 0 && difference < 1) {
            // Half star
            return (
              <div key={index} className="relative">
                <Star className="w-5 h-5 text-gray-300" fill="currentColor" />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: '50%' }}
                >
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                </div>
              </div>
            );
          } else {
            // Empty star
            return (
              <Star
                key={index}
                className="w-5 h-5 text-gray-300"
                fill="currentColor"
              />
            );
          }
        })}
        <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

            

  return (
    <div className="flex">
      <ClientNavbar />
      <div 
        className={`flex-1 transition-all duration-300 ${
          isSidebarMinimized ? 'ml-20' : 'ml-80'
        }`}
      >
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            Registered Construction Companies
          </h1>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search companies by name..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-4 pl-12 pr-4 text-gray-900 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg 
                  className="w-5 h-5 text-gray-500"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          
          
          <Filter onFilterChange={handleFilterChange} />

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loading loading-spinner loading-lg text-yellow-400"></div>
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">No companies found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <Link to={`/client/companies/${company.id}`} key={company.id} className="block h-full">
                  <div className="card bg-base-100 shadow-xl h-full hover:shadow-2xl transition-shadow">
                    <figure className="h-48 w-full">
                      <img 
                        src={company.coverImage} 
                        alt={company.name} 
                        className="w-full h-full object-cover" 
                      />
                    </figure>
                    <div className="card-body flex flex-col justify-between p-6">
                      <div>
                        <h2 className="card-title text-xl font-bold mb-2">{company.name}</h2>
                        <p className="text-gray-600 line-clamp-2 mb-4">{company.shortDescription}</p>
                      </div>
                      {renderStars(company.rating)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredCompaniesPage;