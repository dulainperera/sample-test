import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Filter, MapPin, Building, DollarSign, Clock, AlertCircle } from 'lucide-react';

const FilterSection = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    priority: '',
    budget: '',
    daysLeft: ''
  });

  // Data from mockTenders
  const locations = [
    'Colombo', 'Kandy', 'Galle', 'Ella', 'Negombo',
    'Kurunegala', 'Anuradhapura', 'Jaffna', 'Battaramulla', 'Bentota'
  ];

  const categories = [
    'Commercial', 'Residential', 'Infrastructure', 
    'Hospitality', 'Industrial', 'Healthcare'
  ];

  const priorities = [
    { value: 'hot', label: 'Hot Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' }
  ];

  const budgetRanges = [
    { value: '0-499000', label: 'Under $500K' },
    { value: '500000-1000000', label: '$500K - $1M' },
    { value: '1000000-', label: 'Over $1M' }
  ];

  const daysLeftOptions = [
    { value: '0-5', label: 'Urgent (≤ 5 days)' },
    { value: '0-7', label: 'Within a week' },
    { value: '0-14', label: 'Within 2 weeks' },
    { value: '0-30', label: 'Within a month' }
  ];

  const handleFilterChange = (name, value) => {
    const updatedFilters = {
      ...filters,
      [name]: value
    };
    setFilters(updatedFilters);
    
    // Transform the filters before passing to parent
    const transformedFilters = {
      ...updatedFilters,
      daysLeft: updatedFilters.daysLeft ? updatedFilters.daysLeft.split('-').map(Number) : null
    };
    
    onFilterChange(transformedFilters);
  };
  

  const clearFilters = () => {
    const resetFilters = {
      location: '',
      category: '',
      priority: '',
      budget: '',
      daysLeft: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-yellow-600" />
          <h2 className="text-lg font-semibold text-gray-800">Filter Tenders</h2>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
        >
          Clear all filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Location Filter */}
        <div>
          <label className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            Location
          </label>
          <select
            value={filters.location}
            className="w-full rounded-lg border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="flex items-center text-sm text-gray-600 mb-2">
            <Building className="w-4 h-4 mr-1" />
            Category
          </label>
          <select
            value={filters.category}
            className="w-full rounded-lg border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="flex items-center text-sm text-gray-600 mb-2">
            <AlertCircle className="w-4 h-4 mr-1" />
            Priority
          </label>
          <select
            value={filters.priority}
            className="w-full rounded-lg border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="">All Priorities</option>
            {priorities.map(priority => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Range Filter */}
        <div>
          <label className="flex items-center text-sm text-gray-600 mb-2">
            <DollarSign className="w-4 h-4 mr-1" />
            Budget Range
          </label>
          <select
            value={filters.budget}
            className="w-full rounded-lg border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
            onChange={(e) => handleFilterChange('budget', e.target.value)}
          >
            <option value="">Any Budget</option>
            {budgetRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Days Left Filter */}
        <div>
    <label className="flex items-center text-sm text-gray-600 mb-2">
      <Clock className="w-4 h-4 mr-1" />
      Days Left
    </label>
    <select
      value={filters.daysLeft}
      className="w-full rounded-lg border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
      onChange={(e) => handleFilterChange('daysLeft', e.target.value)}
    >
      <option value="">Any Time</option>
      {daysLeftOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
      </div>
    </div>
  );
};

FilterSection.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default FilterSection;