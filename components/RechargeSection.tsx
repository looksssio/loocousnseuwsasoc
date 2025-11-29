
import React from 'react';
import type { CoinPackage } from '../types';
import { InfoIcon } from './Icons';
import CoinPackageCard from './CoinPackageCard';

interface RechargeSectionProps {
  packages: CoinPackage[];
  selectedPackageId: number;
  onSelectPackage: (id: number) => void;
}

const RechargeSection: React.FC<RechargeSectionProps> = ({ packages, selectedPackageId, onSelectPackage }) => {
  return (
    <section>
      <h2 className="text-base md:text-lg font-bold text-gray-900">Recharge</h2>
      <div className="flex items-center text-xs md:text-sm text-gray-500 mt-1 mb-4">
        <span>Save around 25% with a lower third-party service fee.</span>
        <InfoIcon className="w-3 h-3 md:w-4 md:h-4 ml-1 text-gray-400" />
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {packages.map((pkg) => (
          <CoinPackageCard 
            key={pkg.id}
            packageInfo={pkg}
            isSelected={selectedPackageId === pkg.id}
            onSelect={onSelectPackage}
          />
        ))}
      </div>
    </section>
  );
};

export default RechargeSection;
