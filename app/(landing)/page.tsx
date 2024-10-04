import React from 'react';

import CrystalCanvas from '@/shared/components/canvas/CrystalCanvas';
import UISection from '@/shared/components/ui/UISection';
import Header from '@/app/(landing)/_components/Header';
import IntroButtonSection from '@/app/(landing)/_components/IntroButtonSection';
import PreviousButton from '@/shared/components/ui/PreviousButton';

const LandingPage = () => {
  return (
    <>
      <PreviousButton />
      <UISection>
        <Header />
        <IntroButtonSection />
      </UISection>
      <CrystalCanvas />
    </>
  );
};

export default LandingPage;
