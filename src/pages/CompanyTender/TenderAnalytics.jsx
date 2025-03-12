import React, { useState, useEffect } from 'react';
import CompanyNavbar from '../../components/CompanyNavbar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Award,
  
  ArrowUpRight,
  ArrowDownRight 
} from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const mockData = {
  bidSuccess: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Success Rate',
        data: [65, 70, 68, 75, 82, 85],
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  },
  bidVolume: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Number of Bids',
        data: [12, 19, 15, 25, 22, 30],
        backgroundColor: 'rgba(234, 179, 8, 0.8)',
      }
    ]
  },
  bidDistribution: {
    labels: ['Won', 'Lost', 'Pending'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(234, 179, 8, 0.8)'
        ]
      }
    ]
  }
};

const TenderAnalytics = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [timeframe, setTimeframe] = useState('6months');

  useEffect(() => {
    const handleSidebarStateChange = (event) => {
      setIsSidebarMinimized(event.detail);
    };
    
    window.addEventListener('sidebarStateChange', handleSidebarStateChange);
    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarStateChange);
    };
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <CompanyNavbar />
      <div className={`flex-1 p-4 sm:p-8 transition-all duration-300 ${
        isSidebarMinimized ? 'ml-20' : 'ml-80'
      }`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="relative mb-12 overflow-hidden bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="relative z-10">
              <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Tender Analytics</h1>
              <p className="text-gray-600">Track your bidding performance and success metrics</p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-yellow-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20"></div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: 'Success Rate',
                value: '85%',
                change: '+5%',
                trend: 'up',
                icon: <Award className="w-6 h-6 text-yellow-600" />,
                bgColor: 'bg-yellow-100'
              },
              {
                title: 'Average Bid Value',
                value: '$450K',
                change: '+12%',
                trend: 'up',
                icon: <DollarSign className="w-6 h-6 text-green-600" />,
                bgColor: 'bg-green-100'
              },
              {
                title: 'Total Bids',
                value: '123',
                change: '-3%',
                trend: 'down',
                icon: <TrendingUp className="w-6 h-6 text-red-600" />,
                bgColor: 'bg-red-100'
              },
              {
                title: 'Active Bids',
                value: '45',
                change: '+8%',
                trend: 'up',
                icon: <Calendar className="w-6 h-6 text-blue-600" />,
                bgColor: 'bg-blue-100'
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    {stat.icon}
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  )}
                  {stat.change} from last period
                </div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Success Rate Trend */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Success Rate Trend</h3>
                <select
                  className="text-sm border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                >
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                </select>
              </div>
              <div className="h-80">
                <Line data={mockData.bidSuccess} options={chartOptions} />
              </div>
            </div>

            {/* Bid Volume */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Monthly Bid Volume</h3>
              <div className="h-80">
                <Bar data={mockData.bidVolume} options={chartOptions} />
              </div>
            </div>

            {/* Bid Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Bid Status Distribution</h3>
              <div className="h-80">
                <Doughnut data={mockData.bidDistribution} options={{
                  ...chartOptions,
                  cutout: '60%'
                }} />
              </div>
            </div>

            {/* Additional Analytics Block */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Performance Metrics</h3>
              <div className="space-y-4">
                {[
                  { label: 'Average Response Time', value: '2.5 days' },
                  { label: 'Win Rate by Value', value: '72%' },
                  { label: 'Competitive Index', value: '8.5/10' },
                  { label: 'Average Markup', value: '15%' }
                ].map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{metric.label}</span>
                    <span className="font-semibold text-gray-900">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderAnalytics;