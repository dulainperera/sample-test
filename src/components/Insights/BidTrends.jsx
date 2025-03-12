import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import PropTypes from 'prop-types';

const BidTrends = () => {
  const bidData = [
    {
      category: 'Residential',
      currentMonthBids: 12,
      previousMonthBids: 10,
      percentageChange: 20,
    },
    {
      category: 'Commercial',
      currentMonthBids: 8,
      previousMonthBids: 9,
      percentageChange: -11,
    },
    {
      category: 'Industrial',
      currentMonthBids: 5,
      previousMonthBids: 4,
      percentageChange: 25,
    },
    {
      category: 'Renovation',
      currentMonthBids: 15,
      previousMonthBids: 12,
      percentageChange: 25,
    },
  ];

  // ...rest of the code

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const currentBids = payload[0].value;
      const prevBids = payload[1].value;
      const change = ((currentBids - prevBids) / prevBids * 100).toFixed(1);

      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <h3 className="font-semibold text-gray-900">{label}</h3>
          <div className="space-y-2 mt-2">
            <p className="text-sm text-gray-600">
              Current Month: <span className="font-medium">{currentBids}</span>
            </p>
            <p className="text-sm text-gray-600">
              Previous Month: <span className="font-medium">{prevBids}</span>
            </p>
            <p className="text-sm">
              Change:{' '}
              <span className={`font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
      })
    ),
    label: PropTypes.string,
  };
  
  // Add default props
  CustomTooltip.defaultProps = {
    active: false,
    payload: [],
    label: '',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-500 to-amber-400 p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-full">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Bid Trends</h2>
            <p className="text-white/80 mt-1 text-sm">Monthly comparison of bids across sectors</p>
          </div>
        </div>
      </div>
  
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {bidData.map((item) => (
            <div 
              key={item.category} 
              className="bg-gray-50 hover:bg-gray-100 rounded-xl p-5 transition-all duration-200"
            >
              <span className="text-sm font-medium text-gray-600 block mb-4">
                {item.category}
              </span>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl font-bold text-gray-900">
                    {item.currentMonthBids}
                  </span>
                  <div 
                    className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                      item.percentageChange >= 0 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}
                  >
                    {item.percentageChange >= 0 ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    <span className="text-xs font-semibold">
                      {item.percentageChange >= 0 ? '+' : ''}{item.percentageChange}%
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Current month bids
                </div>
              </div>
            </div>
          ))}
        </div>
  
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bidData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="category" 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="currentMonthBids" 
                fill="#EAB308" 
                name="Current Month"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="previousMonthBids" 
                fill="#F59E0B" 
                name="Previous Month"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BidTrends;