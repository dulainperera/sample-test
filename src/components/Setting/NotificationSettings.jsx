import { useState } from 'react';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    newBids: true,
    projectUpdates: true,
    marketing: false
  });

  return (
    <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notification Preferences</h2>

    <div className="space-y-4">
      {Object.entries(notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive notifications about {key.toLowerCase()}
            </p>
            </div>
            <button
              type="button"
              className={`${
                value ? 'bg-yellow-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2`}
              onClick={() => setNotifications({ ...notifications, [key]: !value })}
            >
              <span
                className={`${
                  value ? 'translate-x-5' : 'translate-x-0'
                } inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;