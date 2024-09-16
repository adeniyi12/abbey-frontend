'use client';
import React, { useState } from 'react';
import { updateUserDetails } from '../api/services/user';

export default function EditUserDetails({ user }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState(user);  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails: any) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const {mutate, error} = updateUserDetails()

  const handleSaveClick = async () => {
    mutate(userDetails)
    setIsEditing(false);
  };

  if (error) {
    console.log(error)
  }


  return (
    <div>
      <div className="px-4 sm:px-0 flex justify-between items-center">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h3>
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={isEditing ? handleSaveClick : handleEditClick}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      <div className="mt-6 text-left">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          {[
            { label: 'First name', value: 'first_name' },
            { label: 'Last name', value: 'last_name' },
            { label: 'Contact', value: 'phone_number' },
            { label: 'Email address', value: 'email' },
            { label: 'Location', value: 'location' },
          ].map((field) => (
            <div key={field.value} className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">{field.label}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                {isEditing ? (
                  <input
                    type="text"
                    name={field.value}
                    value={userDetails[field.value] || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full pl-1.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                ) : (
                  userDetails?.[field.value] || 'N/A'
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
