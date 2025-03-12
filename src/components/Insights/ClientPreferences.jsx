import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart as PieChartIcon, Users, TrendingUp } from 'lucide-react';

// Define CustomTooltip component with prop types
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload || {};
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
        <div className="font-semibold text-gray-900 mb-2">{data.name}</div>
        <div className="space-y-1 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Percentage:</span>
            <span className="font-medium">{data.value}%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Projects:</span>
            <span className="font-medium">{data.count}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Growth:</span>
            <span className="font-medium text-green-600">{data.trend}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Add prop types for CustomTooltip
CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number,
        count: PropTypes.number,
        trend: PropTypes.string
      }),
      value: PropTypes.number
    })
  )
};

// Add default props for CustomTooltip
CustomTooltip.defaultProps = {
  active: false,
  payload: []
};

// Define type for preference data item
const preferenceItemType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  trend: PropTypes.string.isRequired
});

const ClientPreferences = () => {
  const preferenceData = [
    { name: 'Residential', value: 60, count: 120, trend: '+15%' },
    { name: 'Commercial', value: 30, count: 60, trend: '+8%' },
    { name: 'Industrial', value: 10, count: 20, trend: '+5%' }
  ];

  const COLORS = ['#EAB308', '#F59E0B', '#D97706'];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-500 to-amber-400 p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-full">
            <PieChartIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Client Preferences</h2>
            <p className="text-white/80 mt-1 text-sm">Project type distribution</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {preferenceData.map((item) => (
            <div key={item.name} className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
              <div className="flex items-center gap-2 text-yellow-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">{item.value}%</span>
                <span className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {item.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={preferenceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {preferenceData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-gray-600">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Add prop types validation for ClientPreferences component
ClientPreferences.propTypes = {
  preferenceData: PropTypes.arrayOf(preferenceItemType)
};

export default ClientPreferences;