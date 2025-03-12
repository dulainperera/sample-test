// src/pages/company-dashboard/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, FileText, Settings, Users, 
  TrendingUp, Calendar,  
  Clock, CheckCircle, AlertTriangle 
} from 'lucide-react';
import CompanyNavbar from '../../components/CompanyNavbar';

const CompanyHome = () => {
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

  // Company stats
  const statCards = [
    {
      label: 'Active Projects',
      value: '8',
      trend: '+2',
      trendUp: true
    },
    {
      label: 'Pending Quotes',
      value: '12',
      trend: '+5',
      trendUp: true
    },
    {
      label: 'Project Completion',
      value: '87%',
      trend: '+3%',
      trendUp: true
    },
    {
      label: 'Client Satisfaction',
      value: '4.8',
      trend: '-0.1',
      trendUp: false
    },
  ];

  // Main action cards
  const mainCards = [
    {
      title: 'Project Management',
      icon: <Building size={48} />,
      description: 'Manage all your active and upcoming construction projects.',
      link: '/company/projects',
      color: 'bg-gradient-to-r from-yellow-500 to-amber-400',
      stats: '8 active, 3 pending'
    },
    {
      title: 'Quote Requests',
      icon: <FileText size={48} />,
      description: 'Review new requests for quotes and send proposals.',
      link: '/company/tender',
      color: 'bg-gradient-to-r from-yellow-500 to-amber-400',
      stats: '12 new requests',
      badge: {
        text: 'New',
        count: 5
      }
    }
  ];

  // Quick action tiles
  const quickActionTiles = [
    {
      title: 'Portfolio',
      icon: <Users size={40} />,
      description: 'Manage client relationships and communications.',
      link: '/company/portfolio',
      color: 'bg-amber-400',
      count: 24
    },
    {
      title: 'Tender',
      icon: <Calendar size={40} />,
      description: 'View and manage your project timeline and milestones.',
      link: '/company/tender',
      color: 'bg-amber-400'
    },
    {
      title: 'Performance',
      icon: <TrendingUp size={40} />,
      description: 'Track your company metrics and growth statistics.',
      link: '/company/insights',
      color: 'bg-amber-400'
    },
    {
      title: 'Settings',
      icon: <Settings size={40} />,
      description: 'Update your company profile and preferences.',
      link: '/company/settings',
      color: 'bg-amber-400'
    }
  ];

  // Recent activities
  const recentActivities = [
    { id: 1, text: 'New quote request from Omindu Abewardane', time: '30 minutes ago', icon: <FileText /> },
    { id: 2, text: 'Project "Central Tower Foundation" milestone completed', time: '2 hours ago', icon: <CheckCircle /> },
    { id: 3, text: 'Material delivery for "Solar-Powered Apartment" delayed', time: 'Yesterday', icon: <AlertTriangle /> },
    { id: 4, text: 'Client meeting scheduled with Kamal Perera', time: 'Yesterday', icon: <Calendar /> },
  ];

  // Upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      project: 'Colombo Luxury Apartments',
      deadline: 'August 15, 2023',
      daysLeft: 3,
      completion: 85
    },
    {
      id: 2,
      project: 'Modern Office Complex',
      deadline: 'September 5, 2023',
      daysLeft: 24,
      completion: 62
    },
    {
      id: 3,
      project: 'Eco-Friendly Shopping Mall',
      deadline: 'August 23, 2023',
      daysLeft: 11,
      completion: 40
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <CompanyNavbar />
      <div 
        className={`flex-1 transition-all duration-300 ${
          isSidebarMinimized ? 'ml-20' : 'ml-80'
        }`}
      >
        <div className="h-full overflow-auto">
          <div className="container mx-auto px-4 py-6">
            {/* Welcome Message */}
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Welcome, <span className="text-yellow-500">Lanka Constructions</span>
              </h1>
              <p className="text-gray-600 mt-2">Company Dashboard Overview</p>
            </div>
            
            {/* Stats Overview Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {statCards.map((stat, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{stat.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      stat.trendUp ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
              ))}
            </div>
  
            <div className="space-y-6">
              {/* Main Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mainCards.map((card, index) => (
                  <div key={index} className="relative group">
                  
                  <Link 
  to="/company/insights"
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
                    {card.badge && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                        {card.badge.count} {card.badge.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
  
              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-100 p-5 flex justify-between items-center">
                  <h2 className="text-xl font-bold">Upcoming Deadlines</h2>
                  <Link to="/company/tender" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                    View all
                  </Link>
                </div>
                <ul className="divide-y divide-gray-100">
                  {upcomingDeadlines.map((deadline) => (
                    <li key={deadline.id} className="p-5 hover:bg-gray-50">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">{deadline.project}</h3>
                          <div className="flex items-center mt-1">
                            <Clock className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500">{deadline.deadline}</span>
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                              deadline.daysLeft <= 7 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {deadline.daysLeft} days left
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 sm:mt-0">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-700 mr-3">{deadline.completion}%</span>
                            <div className="w-48 bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-yellow-500 h-2.5 rounded-full" 
                                style={{ width: `${deadline.completion}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
  
              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {quickActionTiles.map((tile, index) => (
                  <Link 
                    key={index} 
                    to={tile.link}
                    className={`${tile.color} transform hover:scale-102 transition-all duration-200 p-4 sm:p-6 rounded-xl shadow-md text-white`}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-3 bg-white/10 rounded-full">
                        {tile.icon}
                      </div>
                      <h2 className="text-xl font-semibold">{tile.title}</h2>
                      {tile.count && (
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{tile.count}</span>
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
  
              {/* Switch to Client Dashboard */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Client Account</h2>
                    <p className="text-gray-600">Switch to your Client dashboard</p>
                  </div>
                  <Link 
                    to="/client/home" 
                    className="mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md transition-colors"
                  >
                    Switch to Client View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHome;