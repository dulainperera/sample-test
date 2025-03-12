import { useState } from "react";
import PropTypes from "prop-types";

function Filter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    rating: "",
    employeeSize: "",
    established: ""
  });

  const types = ["Commercial", "Residential", "Industrial"];
  const locations = [
    "Colombo",
    "Kandy",
    "Galle",
    "Trincomalee",
    "Negombo",
    "Jaffna",
    "Matara",
    "Kurunegala",
    "Batticaloa"
  ];
  const employeeSizes = [
    { label: "Small (<100)", value: "small" },
    { label: "Medium (100-200)", value: "medium" },
    { label: "Large (>200)", value: "large" }
  ];
  const establishedYears = [
    { label: "Before 2000", value: "before2000" },
    { label: "2000-2010", value: "2000to2010" },
    { label: "After 2010", value: "after2010" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Filter Companies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Type
          </label>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <select
            name="rating"
            value={filters.rating}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">All Ratings</option>
            <option value="4.5">4.5 & Above</option>
            <option value="4.0">4.0 & Above</option>
            <option value="3.5">3.5 & Above</option>
          </select>
        </div>

        {/* Employee Size Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Size
          </label>
          <select
            name="employeeSize"
            value={filters.employeeSize}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">All Sizes</option>
            {employeeSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>

        {/* Established Year Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Established
          </label>
          <select
            name="established"
            value={filters.established}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">All Years</option>
            {establishedYears.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default Filter;