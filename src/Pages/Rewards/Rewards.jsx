import React from 'react';
import './Rewards.css';
import HelmetInfo from 'Components/HelmetInfo/HelmetInfo';
import { useLanguage } from 'Components/Languages/LanguageContext';
import ContainerMedia from 'Components/ContainerMedia/ContainerMedia';
import RewardsHero from './Components/RewardsHero/RewardsHero';
import RewardsFeatures from './Components/RewardsFeatures/RewardsFeatures';
import RewardsFAQ from './Components/RewardsFAQ/RewardsFAQ';
import RewardsTerms from './Components/RewardsTerms/RewardsTerms';

const Rewards = () => {
  const { currentLanguage } = useLanguage();

  return (
    <>
      <HelmetInfo titlePage={currentLanguage === 'ar' ? 'برنامج المكافآت' : 'Rewards Program'} />

      <div className="rewards-page title-section">
        {/* Hero Section */}
        <RewardsHero />

        <main>
          <ContainerMedia>
            {/* Features Section */}
            <RewardsFeatures />

            {/* Terms Section */}
            <RewardsTerms />
            {/* FAQ Section */}
            <RewardsFAQ />

          </ContainerMedia>
        </main>
      </div>
    </>
  );
};

export default Rewards;