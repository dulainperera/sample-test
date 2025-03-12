import  { useState, useEffect } from 'react';
import CompanyNavbar from '../../components/CompanyNavbar';
import { 
  Clock, TrendingUp, AlertTriangle, CheckCircle, DollarSign,
  FileText, Users, ArrowUpRight, Sparkles, Download, Search,
   SortAsc, SortDesc
} from 'lucide-react';

const mockBids = [
    {
      id: 1,
      tenderTitle: "Commercial Complex Development",
      clientName: "ABC Developers",
      bidAmount: 480000,
      originalBudget: 500000,
      submissionDate: "2024-03-01",
      deadline: "2024-03-15",
      status: "under-review",
      competitorCount: 8,
      bidStrength: "strong",
      documents: [
        { name: "Technical Proposal.pdf", size: "2.4 MB" },
        { name: "Financial Bid.pdf", size: "1.1 MB" }
      ]
    },
    {
      id: 2,
      tenderTitle: "Hospital Renovation Project",
      clientName: "Healthcare Solutions",
      bidAmount: 750000,
      originalBudget: 800000,
      submissionDate: "2024-02-15",
      deadline: "2024-04-01",
      status: "pending",
      competitorCount: 5,
      bidStrength: "moderate",
      documents: [
        { name: "Technical Specs.pdf", size: "3.1 MB" },
        { name: "Cost Analysis.pdf", size: "1.8 MB" }
      ]
    },
    // Add more mock bids as needed
  ];
  

const ActiveBids = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [bids, setBids] = useState(mockBids);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ field: 'submissionDate', direction: 'desc' });
  const [ setSelectedBid] = useState(null);

  useEffect(() => {
    const handleSidebarStateChange = (event) => {
      setIsSidebarMinimized(event.detail);
    };
    
    window.addEventListener('sidebarStateChange', handleSidebarStateChange);
    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarStateChange);
    };
  }, []);

  const handleSort = (field) => {
    const newDirection = sortConfig.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ field, direction: newDirection });

    const sortedBids = [...bids].sort((a, b) => {
      if (field === 'bidAmount' || field === 'competitorCount') {
        return newDirection === 'asc' ? a[field] - b[field] : b[field] - a[field];
      }
      return newDirection === 'asc' 
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    });

    setBids(sortedBids);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = mockBids.filter(bid => 
      bid.tenderTitle.toLowerCase().includes(query.toLowerCase()) ||
      bid.clientName.toLowerCase().includes(query.toLowerCase())
    );
    setBids(filtered);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    const filtered = status === 'all' 
      ? mockBids 
      : mockBids.filter(bid => bid.status === status);
    setBids(filtered);
  };

  const getBidStatusInfo = (status) => {
    const statusMap = {
      'pending': {
        color: 'yellow',
        icon: <Clock className="w-5 h-5" />,
        text: 'Pending Review'
      },
      'under-review': {
        color: 'blue',
        icon: <FileText className="w-5 h-5" />,
        text: 'Under Review'
      },
      'accepted': {
        color: 'green',
        icon: <CheckCircle className="w-5 h-5" />,
        text: 'Accepted'
      },
      'rejected': {
        color: 'red',
        icon: <AlertTriangle className="w-5 h-5" />,
        text: 'Rejected'
      }
    };
    return statusMap[status] || statusMap.pending;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <CompanyNavbar />
      <div className={`flex-1 p-4 sm:p-8 transition-all duration-300 ${
        isSidebarMinimized ? 'ml-20' : 'ml-80'
      }`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="relative mb-8 overflow-hidden bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="relative z-10">
              <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Active Bids</h1>
              <p className="text-gray-600">Track and manage your tender submissions</p>
            </div>
            
            {/* Search Bar */}
            <div className="mt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bids..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-yellow-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20"></div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: 'Total Active Bids',
                value: bids.length,
                icon: <FileText className="w-6 h-6 text-yellow-600" />,
                bgColor: 'bg-yellow-100'
              },
              {
                title: 'Under Review',
                value: bids.filter(b => b.status === 'under-review').length,
                icon: <Users className="w-6 h-6 text-blue-600" />,
                bgColor: 'bg-blue-100'
              },
              {
                title: 'Success Rate',
                value: '65%',
                icon: <TrendingUp className="w-6 h-6 text-green-600" />,
                bgColor: 'bg-green-100'
              },
              {
                title: 'Total Bid Value',
                value: `$${bids.reduce((sum, bid) => sum + bid.bidAmount, 0).toLocaleString()}`,
                icon: <DollarSign className="w-6 h-6 text-purple-600" />,
                bgColor: 'bg-purple-100'
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    {stat.icon}
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Bids List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-800">Recent Bids</h2>
                
                {/* Sort Controls */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSort('bidAmount')}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-yellow-600"
                    >
                      Amount {sortConfig.field === 'bidAmount' && (
                        sortConfig.direction === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleSort('submissionDate')}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-yellow-600"
                    >
                      Date {sortConfig.field === 'submissionDate' && (
                        sortConfig.direction === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Status Filters */}
                 {/* Status Filters */}
<div className="flex gap-2">
  {['all', 'pending', 'under-review', 'accepted', 'rejected'].map(status => (
    <button
      key={status}
      onClick={() => handleStatusChange(status)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        selectedStatus === status
          ? 'bg-yellow-500 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
    </button>
  ))}
</div>

{/* Bids Grid */}
<div className="divide-y divide-gray-200">
  {bids.map(bid => {
    const statusInfo = getBidStatusInfo(bid.status);
    return (
      <div key={bid.id} className="p-6 hover:bg-gray-50 transition-colors">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {bid.tenderTitle}
            </h3>
            <p className="text-sm text-gray-500">Client: {bid.clientName}</p>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
            bg-${statusInfo.color}-100 text-${statusInfo.color}-800`}
          >
            {statusInfo.icon}
            <span className="ml-2">{statusInfo.text}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Bid Amount</p>
            <p className="font-semibold text-gray-900">${bid.bidAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Original Budget</p>
            <p className="font-semibold text-gray-900">${bid.originalBudget.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Submission Date</p>
            <p className="font-semibold text-gray-900">
              {new Date(bid.submissionDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Deadline</p>
            <p className="font-semibold text-gray-900">
              {new Date(bid.deadline).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              {bid.competitorCount} competitors
            </div>
            <div className="flex items-center text-sm text-green-600">
              <Sparkles className="w-4 h-4 mr-1" />
              {bid.bidStrength} strength
            </div>
          </div>

          <div className="flex items-center gap-2">
            {bid.documents.map((doc, index) => (
              <button
                key={index}
                className="flex items-center px-3 py-1.5 text-sm text-gray-600 bg-gray-100 
                  rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download className="w-4 h-4 mr-1" />
                {doc.name}
              </button>
            ))}
            <button 
              onClick={() => setSelectedBid(bid)}
              className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white 
                rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium 
                group ml-2"
            >
              View Details
              <ArrowUpRight className="w-4 h-4 ml-2 transform group-hover:translate-x-0.5 
                group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  })}
</div>
</div>
</div>
</div>
</div>
          </div>
        </div>
      </div>
    
  );
};

export default ActiveBids;