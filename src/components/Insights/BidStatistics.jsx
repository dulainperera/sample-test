import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart2, TrendingUp } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-2">{label}</h3>
        {payload.map((entry) => (
          <div 
            key={entry.name} 
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-semibold">
              LKR {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  label: PropTypes.string
};

CustomTooltip.defaultProps = {
  active: false,
  payload: [],
  label: ''
};

const BidStatistics = () => {
  const averageBidData = [
    { category: 'Residential', minBid: 50000, maxBid: 100000, avgBid: 75000 },
    { category: 'Commercial', minBid: 200000, maxBid: 500000, avgBid: 350000 },
    { category: 'Industrial', minBid: 400000, maxBid: 1000000, avgBid: 700000 },
    { category: 'Renovation', minBid: 30000, maxBid: 80000, avgBid: 55000 }
  ];

  const bidTypes = ['Min', 'Avg', 'Max'].map(type => ({
    key: type,
    label: `${type} Bid`,
    value: averageBidData[0][`${type.toLowerCase()}Bid`]
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-500 to-amber-400 p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-full">
            <BarChart2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Bid Analysis</h2>
            <p className="text-white/80 mt-1 text-sm">Project category bid ranges</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {bidTypes.map(({ key, label, value }) => (
            <div key={key} className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
              <div className="flex items-center gap-2 text-yellow-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                LKR {value?.toLocaleString() || '0'}
              </div>
              <div className="text-xs text-gray-500 mt-1">Residential Projects</div>
            </div>
          ))}
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={averageBidData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                dataKey="minBid" 
                name="Minimum Bid" 
                fill="#EAB308" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="avgBid" 
                name="Average Bid" 
                fill="#F59E0B" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="maxBid" 
                name="Maximum Bid" 
                fill="#D97706" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BidStatistics;