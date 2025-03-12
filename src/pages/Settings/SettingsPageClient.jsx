import { useState, useEffect } from 'react';
import { Bell, User, Palette, Shield, Globe } from 'lucide-react';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';
import ClientNavbar from '../../components/ClientNavbar';
import ProfileSettings from '../../components/Setting/ProfileSettings';
import NotificationSettings from '../../components/Setting/NotificationSettings';
import ThemeSettings from '../../components/Setting/ThemeSettings';
import PrivacySettings from '../../components/Setting/PrivacySettings';
import RegionSettings from '../../components/Setting/RegionSettings';

const SettingsPageClient = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  useEffect(() => {
    const handleSidebarStateChange = (event) => {
      setIsSidebarMinimized(event.detail);
    };

    window.addEventListener('sidebarStateChange', handleSidebarStateChange);
    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarStateChange);
    };
  }, []);

  const tabs = [
    { name: 'Profile', icon: <User className="w-6 h-6" />, component: ProfileSettings },
    { name: 'Notifications', icon: <Bell className="w-6 h-6" />, component: NotificationSettings },
    { name: 'Theme', icon: <Palette className="w-6 h-6" />, component: ThemeSettings },
    { name: 'Privacy', icon: <Shield className="w-6 h-6" />, component: PrivacySettings },
    { name: 'Region', icon: <Globe className="w-6 h-6" />, component: RegionSettings }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <ClientNavbar />
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarMinimized ? 'ml-20' : 'ml-80'
      }`}>
          <div className="min-h-screen">
          <div className="bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <h1 className="text-2xl font-bold flex items-center text-gray-900 dark:text-white">
                  Settings
                </h1>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <TabGroup>
                <div className="sm:flex">
                  {/* Sidebar Navigation */}
                  <TabList className="sm:w-72 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    {tabs.map((tab) => (
                      <Tab
                        key={tab.name}
                        className={({ selected }) =>
                          `w-full flex items-center px-6 py-4 text-base font-medium transition-all
                          ${selected 
                            ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-r-4 border-yellow-500' 
                            : 'text-gray-600 dark:text-gray-300 hover:bg-yellow-50/50 dark:hover:bg-yellow-900/10 hover:text-yellow-600 dark:hover:text-yellow-400'
                          }`
                        }
                      >
                        {tab.icon}
                        <span className="ml-4">{tab.name}</span>
                      </Tab>
                    ))}
                  </TabList>

                  {/* Content Area */}
                  <TabPanels className="flex-1 min-h-[650px] bg-white dark:bg-gray-800">
                    {tabs.map((tab) => (
                      <TabPanel 
                        key={tab.name} 
                        className="p-8 text-gray-900 dark:text-gray-100"
                      >
                        <div className="max-w-3xl mx-auto">
                          <tab.component />
                        </div>
                      </TabPanel>
                    ))}
                  </TabPanels>
                </div>
              </TabGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPageClient;