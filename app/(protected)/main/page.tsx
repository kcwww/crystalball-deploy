import React from 'react';

import CrystalCanvas from '@/shared/components/canvas/CrystalCanvas';
import UISection from '@/shared/components/ui/UISection';

import PreviousButton from '@/shared/components/ui/PreviousButton';
import UserHeader from '@/shared/components/ui/UserHeader';
import MessageCount from '@/shared/components/ui/MessageCount';

import ShareLink from './_components/ui/ShareLink';
import FullScreen from './_components/ui/FullScreen';
import HamburgerButton from './_components/ui/HamburgerButton';

const MainPage = () => {
  return (
    <>
      <PreviousButton />
      <HamburgerButton />
      <UISection>
        <div className="flex flex-col items-center gap-2">
          <UserHeader user="김부캠" />
          <MessageCount count={10} />
        </div>
        <div className="flex w-full justify-between">
          <FullScreen />
          <ShareLink userId="1234" />
        </div>
      </UISection>
      <CrystalCanvas />
    </>
  );
};

export default MainPage;
