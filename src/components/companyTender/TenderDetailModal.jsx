import React from 'react';
import PropTypes from 'prop-types';
import { X, MapPin, Calendar, DollarSign, Users, FileText } from 'lucide-react';


const TenderDetailModal = ({ tender, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Tender Details</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-200px)]">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{tender.title}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2 text-yellow-500" />
              {tender.location}
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign className="w-5 h-5 mr-2 text-yellow-500" />
              ${tender.budget.toLocaleString()}
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2 text-yellow-500" />
              {tender.daysLeft} days left
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2 text-yellow-500" />
              {tender.bidsCount} bids submitted
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
            <p className="text-gray-600">{tender.description}</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Required Documents
            </h4>
            <ul className="list-disc list-inside text-yellow-700 text-sm">
              <li>Company Registration</li>
              <li>Financial Statements</li>
              <li>Technical Proposal</li>
              <li>Previous Experience</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg 
              hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle bid submission
              console.log('Submitting bid for:', tender.id);
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg 
              hover:bg-yellow-600 transition-colors font-medium"
          >
            Place Bid
          </button>
          
        </div>
      </div>
    </div>
  );
};

TenderDetailModal.propTypes = {
  tender: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    daysLeft: PropTypes.number.isRequired,
    bidsCount: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TenderDetailModal;