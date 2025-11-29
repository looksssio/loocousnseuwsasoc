
import React from 'react';
import { AddToHomeScreenIcon } from './Icons';

const AddToHomeScreenBanner: React.FC = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-2 md:p-3 flex items-center cursor-pointer">
      <AddToHomeScreenIcon className="mr-3 md:mr-4" />
      <div>
        <h3 className="font-semibold text-sm md:text-base text-gray-800">Add this page to the mobile desktop</h3>
        <p className="text-xs md:text-sm text-gray-500">for easy access with just one click</p>
      </div>
    </div>
  );
};

export default AddToHomeScreenBanner;
