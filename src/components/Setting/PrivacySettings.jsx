import { useState } from 'react';
import {  Eye, EyeOff } from 'lucide-react';

const PrivacySettings = () => {
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Privacy Settings</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Visibility</h3>
          <div className="flex space-x-4">
            <button
              className={`flex items-center px-4 py-2 rounded-md ${
                privacy.profileVisibility === 'public' 
                  ? 'bg-yellow-100 text-yellow-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setPrivacy({ ...privacy, profileVisibility: 'public' })}
            >
              <Eye className="w-5 h-5 mr-2" />
              Public
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${
                privacy.profileVisibility === 'private' 
                  ? 'bg-yellow-100 text-yellow-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setPrivacy({ ...privacy, profileVisibility: 'private' })}
            >
              <EyeOff className="w-5 h-5 mr-2" />
              Private
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 ">Show Email</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Allow companies to see your email</p>
            </div>
            <button
              type="button"
              className={`${
                privacy.showEmail ? 'bg-yellow-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2`}
              onClick={() => setPrivacy({ ...privacy, showEmail: !privacy.showEmail })}
            >
              <span
                className={`${
                  privacy.showEmail ? 'translate-x-5' : 'translate-x-0'
                } inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 ">Show Phone Number</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Allow companies to see your phone number</p>
            </div>
            <button
              type="button"
              className={`${
                privacy.showPhone ? 'bg-yellow-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2`}
              onClick={() => setPrivacy({ ...privacy, showPhone: !privacy.showPhone })}
            >
              <span
                className={`${
                  privacy.showPhone ? 'translate-x-5' : 'translate-x-0'
                } inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;