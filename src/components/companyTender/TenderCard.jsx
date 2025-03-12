import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Clock, DollarSign, MapPin, Users, ArrowUpRight, X, Upload } from 'lucide-react';

const TenderCard = ({ tender, onBidSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [bidForm, setBidForm] = useState({
    bidAmount: '',
    proposedDuration: '',
    technicalProposal: null,
    financialProposal: null
  });

  const getDaysRemaining = () => {
    if (tender.daysLeft !== undefined) {
      return tender.daysLeft;
    }
    if (tender.deadline) {
      const days = Math.ceil((new Date(tender.deadline) - new Date()) / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 0;
    }
    return 0;
  };

  const getTimeRemainingColor = (days) => {
    if (days <= 3) return 'bg-red-500';
    if (days <= 7) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const formatDaysRemaining = (days) => {
    if (days === 0) return 'Deadline today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  };

  const handleBidClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleBidFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setBidForm(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const daysRemaining = getDaysRemaining();

  return (
    <>
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
        <div className="p-6">
          {/* Header with Title and Status */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors">
              {tender.title}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${tender.status === 'open' ? 'bg-green-100 text-green-800' : 
                tender.status === 'closing' ? 'bg-red-100 text-red-800' : 
                'bg-yellow-100 text-yellow-800'}`}>
              {tender.status.charAt(0).toUpperCase() + tender.status.slice(1)}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tender.description}</p>

          {/* Tender Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <DollarSign className="w-4 h-4 mr-2 text-yellow-500" />
              ${tender.budget.toLocaleString()}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-2 text-yellow-500" />
              {tender.location}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-2 text-yellow-500" />
              {tender.bidsCount} {tender.bidsCount === 1 ? 'bid' : 'bids'}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2 text-yellow-500" />
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                daysRemaining <= 3 ? 'bg-red-100 text-red-800' :
                daysRemaining <= 7 ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {formatDaysRemaining(daysRemaining)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Time Remaining</span>
              <span>{formatDaysRemaining(daysRemaining)}</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${getTimeRemainingColor(daysRemaining)}`}
                style={{ width: `${Math.min(100, (daysRemaining / 30) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 group-hover:bg-yellow-50 transition-colors">
          <div className="flex gap-4">
            <button 
              onClick={(e) => e.stopPropagation()}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg 
                hover:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={handleBidClick}
              className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg 
                hover:bg-yellow-600 transition-colors font-medium flex items-center justify-center gap-2"
            >
              Bid Now
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bid Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">Submit Bid</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{tender.title}</h2>
              <p className="text-gray-600 mb-6">{tender.description}</p>

              {/* Bid Form */}
              <div className="space-y-6">
                {/* Amount and Duration Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bid Amount</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="bidAmount"
                        value={bidForm.bidAmount}
                        onChange={handleBidFormChange}
                        className="mt-1 block w-full pl-7 rounded-md border border-gray-300 px-3 py-2 
                          focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Proposed Duration (days)
                    </label>
                    <input
                      type="number"
                      name="proposedDuration"
                      value={bidForm.proposedDuration}
                      onChange={handleBidFormChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                        focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
                      required
                    />
                  </div>
                </div>

                {/* File Upload Section */}
                <div className="space-y-4">
                  {/* Technical Proposal Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Technical Proposal
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 
                      border-dashed rounded-md hover:border-yellow-500 transition-colors">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer rounded-md font-medium text-yellow-600 
                            hover:text-yellow-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              name="technicalProposal"
                              onChange={handleBidFormChange}
                              className="sr-only"
                              accept=".pdf,.doc,.docx"
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PDF or DOC up to 10MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Financial Proposal Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Financial Proposal
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 
                      border-dashed rounded-md hover:border-yellow-500 transition-colors">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer rounded-md font-medium text-yellow-600 
                            hover:text-yellow-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              name="financialProposal"
                              onChange={handleBidFormChange}
                              className="sr-only"
                              accept=".pdf,.doc,.docx"
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PDF or DOC up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
                  <ul className="list-disc list-inside text-sm text-yellow-700">
                    <li>Review all tender documents carefully</li>
                    <li>Ensure compliance with requirements</li>
                    <li>Submit all necessary documentation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg 
                  hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onBidSubmit?.({
                    tenderId: tender.id,
                    ...bidForm
                  });
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg 
                  hover:bg-yellow-600 transition-colors font-medium"
              >
                Confirm Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

TenderCard.propTypes = {
  tender: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    bidsCount: PropTypes.number.isRequired,
    daysLeft: PropTypes.number,
    deadline: PropTypes.string
  }).isRequired,
  onBidSubmit: PropTypes.func
};

export default TenderCard;