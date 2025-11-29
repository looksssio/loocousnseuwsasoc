
import React from 'react';
import type { CoinPackage } from '../types';
import { CoinIcon } from './Icons';

interface CoinPackageCardProps {
  packageInfo: CoinPackage;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const CoinPackageCard: React.FC<CoinPackageCardProps> = ({ packageInfo, isSelected, onSelect }) => {
  const { id, coins, price, isCustom } = packageInfo;
  
  const borderClass = isSelected ? 'border-red-500 border-2' : 'border-gray-200 border';

  return (
    <div
      className={`bg-gray-50 rounded-lg p-2 md:p-4 text-center cursor-pointer transition-all duration-200 ${borderClass} hover:shadow-md`}
      onClick={() => onSelect(id)}
    >
      {isCustom ? (
        <p className="text-base md:text-lg font-bold text-gray-800 h-12 flex items-center justify-center">Custom</p>
      ) : (
        <>
          <div className="flex items-center justify-center mb-1">
            <CoinIcon className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 mr-1" />
            <span className="text-lg md:text-xl font-bold text-gray-900">{coins}</span>
          </div>
          <span className="text-xs md:text-sm text-gray-500">${price.toFixed(2)}</span>
        </>
      )}
    </div>
  );
};

export default CoinPackageCard;
