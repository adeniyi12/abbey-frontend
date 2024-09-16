import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid'; // Assuming you're using Heroicons

export default function UserRelationships({ friendsData, followingData, followersData }: any) {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('friends');

  // Function to render the active data based on the tab
  const getActiveData = () => {
    switch (activeTab) {
      case 'friends':
        return friendsData;
      case 'following':
        return followingData;
      case 'followers':
        return followersData;
      default:
        return [];
    }
  };

  // Tab button class to dynamically apply the active styles
  const getTabClass = (tab: string) =>
    `cursor-pointer px-4 py-2 ${activeTab === tab ? 'border-b-2 border-indigo-600 font-semibold text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`;

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex justify-around bg-gray-100 p-4 mb-4">
        <div onClick={() => setActiveTab('friends')} className={getTabClass('friends')}>
          Friends
        </div>
        <div onClick={() => setActiveTab('following')} className={getTabClass('following')}>
          Following
        </div>
        <div onClick={() => setActiveTab('followers')} className={getTabClass('followers')}>
          Followers
        </div>
      </div>

      {/* List of People */}
      <ul role="list" className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        {getActiveData().map((person: any) => (
          <li key={person.email} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
            <div className="flex min-w-0 gap-x-4">
              <img alt="" src={person.profile_picture} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <a href={person.href}>
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {person.first_name + ' ' + person.last_name}
                  </a>
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  <a href={`mailto:${person.email}`} className="relative truncate hover:underline">
                    {person.email}
                  </a>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                {person.lastSeen ? (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                  </p>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                )}
              </div>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
