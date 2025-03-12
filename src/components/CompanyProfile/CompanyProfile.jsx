import PropTypes from 'prop-types';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';
import { 
  Star, History, TrendingUp, Wrench, Shield, 
  Trophy, MapPin, Users, Calendar 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyProfile = ({ company }) => {
  const navigate = useNavigate();
  
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((index) => {
          const difference = rating - index + 1;
          if (difference >= 1) {
            return (
              <Star
                key={index}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
              />
            );
          } else if (difference > 0 && difference < 1) {
            return (
              <div key={index} className="relative">
                <Star className="w-5 h-5 text-gray-300" fill="currentColor" />
                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                </div>
              </div>
            );
          } else {
            return (
              <Star
                key={index}
                className="w-5 h-5 text-gray-300"
                fill="currentColor"
              />
            );
          }
        })}
        <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

  // Company Details Section
  const CompanyHeader = () => (
    <div className="card bg-base-100 shadow-xl mb-8">

      <div className="relative">
        <img 
          src={company.coverImage || defaultCoverImage} 
          alt={`${company.name} cover`} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
        
        {/* Update this avatar/icon section */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-40 h-40 rounded-full ring-2 ring-yellow-600 ring-offset-base-100 ring-offset-2 bg-white overflow-hidden shadow-md">
            <img 
              src={company.profileIcon || defaultProfileIcon} 
              alt={`${company.name} logo`}
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
      <div className="card-body pt-12">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{company.name}</h2>
            <p className="text-gray-600 mt-2">{company.shortDescription}</p>
          </div>
          {renderStars(company.rating)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-600" />
              <span className="text-gray-600">{company.location}</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-yellow-600" />
              <span className="text-gray-600">{company.employees} employees</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-600" />
              <span className="text-gray-600">Est. {company.established}</span>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );

  // Tabs Configuration
  const tabs = [
    {
      name: 'Track Record',
      icon: <History className="w-5 h-5" />,
      content: company?.trackRecord && (
        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-4">Experience: {company.trackRecord.yearsOfExperience} years</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {company.trackRecord.notableProjects.map((project, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded mb-3" />
                <h4 className="text-lg font-semibold">{project.title}</h4>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-3">Client Satisfaction</h4>
            <p className="text-3xl font-bold text-yellow-600 mb-4">
              {company.trackRecord.clientSatisfaction.averageRating}/5
            </p>
            {company.trackRecord.clientSatisfaction.positiveFeedback.map((feedback, idx) => (
              <p key={idx} className="flex items-center text-green-600 mb-2">✓ {feedback}</p>
            ))}
          </div>
        </div>
      )
    },
    {
      name: 'Financial Stability',
      icon: <TrendingUp className="w-5 h-5" />,
      content: company?.financialStability && (
        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Financial Overview</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold">Annual Revenue</h4>
                  <p>{company.financialStability.annualRevenue}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold">Growth Rate</h4>
                  <p className="text-green-600">{company.financialStability.growthRate}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold">Credit Rating</h4>
                  <p>{company.financialStability.creditRating}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Financial Health</h3>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="mb-2"><span className="font-semibold">Cash Reserves:</span> {company.financialStability.financialHealth.cashReserves}</p>
                <p className="mb-2"><span className="font-semibold">Debt to Equity:</span> {company.financialStability.financialHealth.debtToEquityRatio}</p>
                <p className="text-sm text-gray-600">{company.financialStability.financialHealth.longTermStability}</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'Services',
      icon: <Wrench className="w-5 h-5" />,
      content: company?.servicesOffered && (
        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Primary Services</h3>
              <div className="space-y-2">
                {company.servicesOffered.primaryServices.map((service, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg shadow flex items-center">
                    <Wrench className="w-4 h-4 text-yellow-600 mr-2" />
                    {service}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Specialized Services</h3>
              <div className="space-y-2">
                {company.servicesOffered.specializedServices.map((service, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg shadow flex items-center">
                    <Star className="w-4 h-4 text-yellow-600 mr-2" />
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'Certifications',
      icon: <Shield className="w-5 h-5" />,
      content: company?.certificationsCompliance && (
        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Industry Certifications</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {company.certificationsCompliance.industryCertifications.map((cert, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg mb-2">{cert.certification}</h4>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
          <h3 className="text-xl font-bold mb-4">Safety Standards</h3>
          <div className="space-y-2">
            {company.certificationsCompliance.safetyStandards.map((standard, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg shadow flex items-center">
                <Shield className="w-4 h-4 text-yellow-600 mr-2" />
                {standard}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      name: 'Awards',
      icon: <Trophy className="w-5 h-5" />,
      content: company?.awardsRecognitions && (
        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Major Awards</h3>
              <div className="space-y-4">
                {company.awardsRecognitions.majorAwards.map((award, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center mb-2">
                      <Trophy className="w-6 h-6 text-yellow-600 mr-2" />
                      <h4 className="font-semibold text-lg">{award.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Awarded by {award.organization} ({award.year})
                    </p>
                    <p className="text-gray-700">{award.reason}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Industry Recognition</h3>
              <div className="space-y-2">
                {company.awardsRecognitions.mediaFeatures.map((feature, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg shadow flex items-center">
                    <Star className="w-4 h-4 text-yellow-600 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <CompanyHeader />
      
      <TabGroup>
        <TabList className="flex space-x-1 rounded-xl bg-yellow-100 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected
                  ? 'bg-yellow-500 text-white shadow'
                  : 'text-gray-700 hover:bg-yellow-200'
                } flex items-center justify-center space-x-2`
              }
            >
              {tab.icon}
              <span>{tab.name}</span>
            </Tab>
          ))}
        </TabList>
        <TabPanels className="mt-4">
          {tabs.map((tab, idx) => (
            <TabPanel key={idx} className="focus:outline-none">
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>

      {company.reviews && company.reviews.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Client Reviews</h2>
          <div className="space-y-4">
            {company.reviews.map((review) => (
              <div key={review.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{review.clientName}</h3>
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <div className="flex gap-4 mt-6 justify-center">
          <button 
            onClick={() => navigate(`/quote-request/${company.id}`)}
            className="btn btn-primary"
          >
            Request Quote
          </button>
          <button className="btn btn-outline">
            Contact Company
          </button>
        </div>
    </div>
  );
};

CompanyProfile.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    profileIcon: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    employees: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    established: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        clientName: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ),
    trackRecord: PropTypes.object,
    financialStability: PropTypes.object,
    servicesOffered: PropTypes.object,
    certificationsCompliance: PropTypes.object,
    awardsRecognitions: PropTypes.object,
  }).isRequired,
};

export default CompanyProfile;