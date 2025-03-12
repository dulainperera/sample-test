import React, { useState, useEffect } from 'react';
import CompanyNavbar from '../../components/CompanyNavbar';
import TenderMap from '../../components/companyTender/TenderMap.jsx';
import { MapPin, Filter, Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';

const mockLocations = [
  {
    id: 1,
    district: "Colombo",
    coordinates: { lat: 6.9271, lng: 79.8612 },
    tenderCount: 15,
    activeTenders: [
      { id: 1, title: "Commercial Complex", budget: 500000 },
      { id: 2, title: "Office Building", budget: 750000 }
    ],
    totalValue: 1250000
  },
  {
    id: 2,
    district: "Kandy",
    coordinates: { lat: 7.2906, lng: 80.6337 },
    tenderCount: 8,
    activeTenders: [
      { id: 3, title: "Hotel Development", budget: 1200000 }
    ],
    totalValue: 1200000
  },
  {
    id: 3,
    district: "Galle",
    coordinates: { lat: 6.0535, lng: 80.2210 },
    tenderCount: 5,
    activeTenders: [
      { id: 4, title: "Resort Construction", budget: 900000 }
    ],
    totalValue: 900000
  },
  {
    id: 4,
    district: "Negombo",
    coordinates: { lat: 7.2094, lng: 79.8345 },
    tenderCount: 10,
    activeTenders: [
      { id: 5, title: "Shopping Mall Renovation", budget: 600000 },
      { id: 6, title: "Luxury Apartment Complex", budget: 850000 }
    ],
    totalValue: 1450000
  },
  {
    id: 5,
    district: "Anuradhapura",
    coordinates: { lat: 8.3114, lng: 80.4037 },
    tenderCount: 6,
    activeTenders: [
      { id: 7, title: "Bridge Construction", budget: 1300000 }
    ],
    totalValue: 1300000
  },
  {
    id: 6,
    district: "Jaffna",
    coordinates: { lat: 9.6615, lng: 80.0255 },
    tenderCount: 4,
    activeTenders: [
      { id: 8, title: "Hospital Expansion", budget: 950000 }
    ],
    totalValue: 950000
  },
  {
    id: 7,
    district: "Battaramulla",
    coordinates: { lat: 6.9270, lng: 79.9092 },
    tenderCount: 7,
    activeTenders: [
      { id: 9, title: "Smart Office Tower", budget: 1100000 }
    ],
    totalValue: 1100000
  },
  {
    id: 8,
    district: "Bentota",
    coordinates: { lat: 6.4253, lng: 80.0022 },
    tenderCount: 9,
    activeTenders: [
      { id: 10, title: "Luxury Villa Construction", budget: 700000 },
      { id: 11, title: "Beachfront Resort", budget: 1400000 }
    ],
    totalValue: 2100000
  },
  {
    id: 9,
    district: "Kurunegala",
    coordinates: { lat: 7.4863, lng: 80.3647 },
    tenderCount: 5,
    activeTenders: [
      { id: 12, title: "Industrial Warehouse", budget: 850000 }
    ],
    totalValue: 850000
  },
  {
    id: 10,
    district: "Ella",
    coordinates: { lat: 6.8750, lng: 81.0467 },
    tenderCount: 6,
    activeTenders: [
      { id: 13, title: "Eco-Friendly Resort", budget: 900000 }
    ],
    totalValue: 900000
  }
]


const TenderHeatmap = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [timeframe, setTimeframe] = useState('month');
  const [locations] = useState(mockLocations);

  useEffect(() => {
    const handleSidebarStateChange = (event) => {
      setIsSidebarMinimized(event.detail);
    };
    
    window.addEventListener('sidebarStateChange', handleSidebarStateChange);
    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarStateChange);
    };
  }, []);

  const selectedLocation = React.useMemo(() => {
    if (!selectedDistrict) return null;
    const location = locations.find(loc => loc.district === selectedDistrict);
    if (!location) {
      console.warn(`No location found for district: ${selectedDistrict}`);
      return null;
    }
    return location;
  }, [selectedDistrict, locations]);

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <CompanyNavbar />
      <div className={`flex-1 p-4 sm:p-8 transition-all duration-300 ${
        isSidebarMinimized ? 'ml-20' : 'ml-80'
      }`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="relative mb-8 overflow-hidden bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="relative z-10">
              <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Tender Heatmap</h1>
              <p className="text-gray-600">Visualize tender distribution across Sri Lanka</p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-yellow-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20"></div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Filter className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold text-gray-800">Filter Options</h3>
              </div>
              <select
                className="w-full rounded-lg border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold text-gray-800">Active District</h3>
              </div>
              <select
                className="w-full rounded-lg border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                value={selectedDistrict || ''}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.district}>{loc.district}</option>
                ))}
              </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold text-gray-800">Timeline View</h3>
              </div>
              <select
                className="w-full rounded-lg border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                defaultValue="upcoming"
              >
                <option value="upcoming">Upcoming Deadlines</option>
                <option value="past">Past Tenders</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>

          {/* Map and Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden" 
               style={{ height: '600px' }}>
            <TenderMap 
              locations={locations}
              selectedDistrict={selectedDistrict}
              onDistrictSelect={handleDistrictSelect}
            />
          </div>

            {/* District Details */}
            <div className="space-y-6">
              {selectedLocation ? (
                <>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-yellow-600" />
                      {selectedLocation.district} Overview
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-600">Active Tenders</span>
                        </div>
                        <span className="font-semibold text-gray-900">{selectedLocation.tenderCount}</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <span className="text-gray-600">Total Value</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          ${selectedLocation.totalValue.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="w-5 h-5 text-yellow-600" />
                          <span className="text-gray-600">Avg. Tender Value</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          ${Math.round(selectedLocation.totalValue / selectedLocation.tenderCount).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Tenders</h3>
                    <div className="space-y-3">
                      {selectedLocation.activeTenders.map(tender => (
                        <div key={tender.id} className="p-4 border border-gray-100 rounded-lg hover:border-yellow-300 transition-colors">
                          <h4 className="font-medium text-gray-800 mb-2">{tender.title}</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <DollarSign className="w-4 h-4 mr-1" />
                            ${tender.budget.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No District Selected</h3>
                  <p className="text-gray-600">Select a district on the map to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderHeatmap;