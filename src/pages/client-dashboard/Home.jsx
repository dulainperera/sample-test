import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, FileText, Settings, Plus, Activity, Briefcase, Bell } from 'lucide-react';
import AdsSlideshow from '../../components/AdsSlideshow';
import ClientNavbar from '../../components/ClientNavbar';

const Home = () => {
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

  // Updated stats for home construction clients
  const statCards = [
    {
      label: 'Home Projec',
      extra: '+1 Planned',
      value: '1',
    },
    {
      label: 'Quotes Received',
      extra: '3 New',
      value: '3',
    },
    {
      label: 'Top Builders',
      extra: '',
      value: '5',
    },
    {
      label: 'Avg. Completion',
      extra: '',
      value: '6 months',
    },
  ];

  // Updated main cards to focus on home building
  const mainCards = [
    {
      title: 'Find Builders',
      icon: <Building size={48} />,
      description: 'Browse trusted home builders to bring your dream house to life.',
      link: '/client/companies',
      color: 'bg-gradient-to-r from-yellow-500 to-amber-400',
      stats: '5 builders'
    },
    {
      title: 'Request a Quote',
      icon: <FileText size={48} />,
      description: 'Submit your project details and receive detailed quotes from top builders.',
      link: '/client/tender',
      color: 'bg-gradient-to-r from-yellow-500 to-amber-400',
      stats: '3 quotes',
      action: {
        icon: <Plus size={24} />,
        label: 'Request Quote',
        link: '/client/tender/create'
      }
    }
  ];

  // Updated secondary card for consultations instead of contacts
  const secondaryCards = [
    {
      title: 'Insights',
      icon: <Users size={40} />,
      description: 'Chat with home design experts for personalized advice.',
      link: '/client/insights',
      color: 'bg-amber-400',
      count: 5
    },
    {
      title: 'Settings',
      icon: <Settings size={40} />,
      description: 'Customize your account and project preferences',
      link: '/client/settings',
      color: 'bg-amber-400'
    }
  ];

  // Recent activities updated to reflect home building
  const recentActivities = [
    { id: 1, text: 'New quote received from DreamHome Constructions', time: '2 hours ago', icon: <Bell /> },
    { id: 2, text: 'Your project plan was viewed by 3 top builders', time: '3 hours ago', icon: <Activity /> },
    { id: 3, text: 'Consultation scheduled for design ideas', time: 'Yesterday', icon: <Briefcase /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <ClientNavbar />
      <div 
        className={`flex-1 transition-all duration-300 ${
          isSidebarMinimized ? 'ml-20' : 'ml-80'
        }`}
      >
        <div className="container mx-auto px-4 py-6 h-full overflow-auto">
          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Hello, <span className="text-yellow-500">Omindu</span>
            </h1>
            <p className="text-gray-600 mt-2">Let build your home!</p>
          </div>
          
          {/* Stats Overview Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{stat.label}</span>
                  {stat.extra && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {stat.extra}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
  
          {/* Main Content Area */}
          <div className="space-y-8">
            {/* Main Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mainCards.map((card, index) => (
                <div key={index} className="relative group">
                  <Link 
                    to={card.link}
                    className={`${card.color} transform hover:scale-102 transition-all duration-200 p-6 sm:p-8 rounded-xl shadow-lg text-white h-full block`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-white/10 rounded-full mr-4">
                          {card.icon}
                        </div>
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-bold">{card.title}</h2>
                          {card.stats && (
                            <p className="text-sm opacity-90 mt-1">{card.stats}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-lg opacity-90 mb-4">{card.description}</p>
                      <div className="mt-auto text-sm opacity-75 flex items-center">
                        <span>View details</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                  {card.action && (
                    <Link
                      to={card.action.link}
                      className="absolute top-4 right-4 bg-white text-yellow-600 hover:bg-yellow-50 p-2 rounded-full shadow-lg transform transition-all duration-200 hover:scale-110"
                      title={card.action.label}
                    >
                      {card.action.icon}
                    </Link>
                  )}
                </div>
              ))}
            </div>
  
            {/* Ads Section */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <AdsSlideshow />
            </div>
  
            {/* Secondary Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {secondaryCards.map((card, index) => (
                <Link 
                  key={index} 
                  to={card.link}
                  className={`${card.color} transform hover:scale-102 transition-all duration-200 p-4 sm:p-6 rounded-xl shadow-md text-white`}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-white/10 rounded-full">
                      {card.icon}
                    </div>
                    <h2 className="text-xl font-semibold">{card.title}</h2>
                    {card.count && (
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{card.count}</span>
                    )}
                  </div>
                </Link>
              ))}
  
              
            </div>
  
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-100">
                <h2 className="text-xl font-bold p-5">Recent Activity</h2>
              </div>
              <ul className="divide-y divide-gray-100">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="p-5 hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-100 p-2 rounded-full">
                        {React.cloneElement(activity.icon, { className: "w-5 h-5 text-yellow-600" })}
                      </div>
                      <div>
                        <p className="text-gray-800">{activity.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
            </div>
  
            {/* Company Switch Section */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Company Account</h2>
                  <p className="text-gray-600">Switch to your company dashboard</p>
                </div>
                <Link 
                  to="/company/home" 
                  className="mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md transition-colors"
                >
                  Switch to Company View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;