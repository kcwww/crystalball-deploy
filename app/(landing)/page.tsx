import React from 'react';

import SnowGlobeCanvas from '@/shared/components/canvas/SnowGlobeCanvas';
import UISection from '@/shared/components/ui/UISection';
import Header from '@/app/(landing)/_components/Header';
import IntroButtonSection from '@/app/(landing)/_components/IntroButtonSection';
import PreviousButton from '@/shared/components/ui/PreviousButton';

const Home = () => {
  return (
    <>
      <PreviousButton />
      <UISection>
        <Header />
        <IntroButtonSection />
      </UISection>
      <SnowGlobeCanvas />
    </>
  );
};

export default Home;
