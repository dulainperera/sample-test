import React, { useState } from 'react';
import { Calculator, Building, MapPin, ArrowRightCircle, Home, Store, Wrench } from 'lucide-react';

const CostCalculator = () => {
  const [formData, setFormData] = useState({
    projectType: '',
    projectSize: '',
    region: ''
  });

  const projectTypes = ['Residential', 'Commercial', 'Renovation'];
  const projectSizes = ['Small', 'Medium', 'Large'];
  const regions = ['Colombo', 'Kandy', 'Galle', 'Jaffna'];

  const getProjectIcon = (type) => {
    switch(type) {
      case 'Residential': return <Home className="w-5 h-5" />;
      case 'Commercial': return <Store className="w-5 h-5" />;
      case 'Renovation': return <Wrench className="w-5 h-5" />;
      default: return <Building className="w-5 h-5" />;
    }
  };

  const calculateCost = () => {
    const baseCosts = {
      Residential: { Small: 1000000, Medium: 5000000, Large: 10000000 },
      Commercial: { Small: 5000000, Medium: 15000000, Large: 30000000 },
      Renovation: { Small: 500000, Medium: 2000000, Large: 5000000 }
    };

    const regionMultipliers = {
      Colombo: 1.3,
      Kandy: 1.1,
      Galle: 1.0,
      Jaffna: 0.9
    };

    const baseCost = baseCosts[formData.projectType][formData.projectSize];
    return baseCost * regionMultipliers[formData.region];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-500 to-amber-400 p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-full">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Cost Calculator</h2>
        </div>
        <p className="text-white/80 mt-2">Estimate your project cost based on type, size, and location</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-gray-700 flex items-center gap-2">
            <Building className="w-5 h-5 text-yellow-600" />
            Project Type
          </label>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
            value={formData.projectType}
            onChange={(e) => setFormData({...formData, projectType: e.target.value})}
          >
            <option value="">Select Project Type</option>
            {projectTypes.map(type => (
              <option key={type} value={type} className="flex items-center gap-2">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 flex items-center gap-2">
            <ArrowRightCircle className="w-5 h-5 text-yellow-600" />
            Project Size
          </label>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
            value={formData.projectSize}
            onChange={(e) => setFormData({...formData, projectSize: e.target.value})}
          >
            <option value="">Select Project Size</option>
            {projectSizes.map(size => (
              <option key={size} value={size}>{size}</option>
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

        {formData.projectType && formData.projectSize && formData.region && (
          <div className="mt-6">
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-100">
              <div className="flex items-center gap-3 mb-3">
                {getProjectIcon(formData.projectType)}
                <h3 className="font-semibold text-gray-800">Project Estimate</h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Estimated Cost:</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    LKR {calculateCost().toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{formData.projectType}</p>
                  <p className="text-sm text-gray-500">{formData.region}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                * This is an approximate estimation based on current market rates
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CostCalculator;