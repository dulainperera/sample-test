import PropTypes from 'prop-types';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';
import { History, TrendingUp, Wrench, Shield, Trophy } from 'lucide-react';

const CompanyTabs = ({ company }) => {const tabs = [
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
                  <div key={idx} className="bg-white p-3 rounded-lg shadow">{service}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Specialized Services</h3>
              <div className="space-y-2">
                {company.servicesOffered.specializedServices.map((service, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg shadow">{service}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Technology Integration</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {company.servicesOffered.technologyIntegration.map((tech, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg shadow">{tech}</div>
              ))}
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
                <Shield className="w-5 h-5 mr-2 text-yellow-600" />
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
              <h3 className="text-xl font-bold mb-4">Recognition</h3>
              <div className="space-y-2">
                {company.awardsRecognitions.mediaFeatures.map((feature, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg shadow">{feature}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];
  return (
    <div className="mt-8">
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
    </div>
  );
};

CompanyTabs.propTypes = {
  company: PropTypes.shape({
    trackRecord: PropTypes.object,
    financialStability: PropTypes.object,
    servicesOffered: PropTypes.object,
    certificationsCompliance: PropTypes.object,
    awardsRecognitions: PropTypes.object
  }).isRequired
};

export default CompanyTabs;