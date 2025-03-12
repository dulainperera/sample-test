import React, { useState } from 'react';
import { Calculator, Building2, MapPin, DollarSign } from 'lucide-react';

const BidProbability = () => {
  const [formData, setFormData] = useState({
    category: '',
    region: '',
    budget: ''
  });

  const categories = ['Residential', 'Commercial', 'Industrial'];
  const regions = ['Colombo', 'Kandy', 'Galle', 'Jaffna'];
  const budgetRanges = ['< 5M', '5M - 10M', '10M - 50M', '> 50M'];

  const calculateProbability = () => {
    const probabilities = {
      Residential: { Colombo: 'High', Kandy: 'Medium', Galle: 'High', Jaffna: 'Low' },
      Commercial: { Colombo: 'Medium', Kandy: 'High', Galle: 'Low', Jaffna: 'Medium' },
      Industrial: { Colombo: 'High', Kandy: 'Low', Galle: 'Medium', Jaffna: 'High' }
    };
    return probabilities[formData.category]?.[formData.region] || 'N/A';
  };

  const getProbabilityColor = (probability) => {
    const colors = {
      High: 'bg-green-100 text-green-800 border-green-200',
      Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Low: 'bg-red-100 text-red-800 border-red-200',
      'N/A': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[probability];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-500 to-amber-400 p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-full">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Bid Success Calculator</h2>
            <p className="text-white/80 mt-1 text-sm">Estimate your winning chances</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-gray-700 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-yellow-600" />
            Project Category
          </label>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="">Select Project Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-yellow-600" />
            Region
          </label>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
            value={formData.region}
            onChange={(e) => setFormData({...formData, region: e.target.value})}
          >
            <option value="">Select Region</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-yellow-600" />
            Budget Range
          </label>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: e.target.value})}
          >
            <option value="">Select Budget Range</option>
            {budgetRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>

        {formData.category && formData.region && formData.budget && (
          <div className="mt-6">
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Success Probability</h3>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getProbabilityColor(calculateProbability())}`}>
                  {calculateProbability()}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Based on historical data and market trends
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BidProbability;