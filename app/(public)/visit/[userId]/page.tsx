import React from 'react';

import CrystalCanvas from '@/shared/components/canvas/CrystalCanvas';
import UISection from '@/shared/components/ui/UISection';
import UserHeader from '@/shared/components/ui/UserHeader';
import MessageCount from '@/app/(public)/visit/_components/MessageCount';

import PreviousButton from '@/shared/components/ui/PreviousButton';
import ArrowButtons from '../_components/ArrowButtons';
import { Button } from '@/components/ui/button';

const VisitPage = ({ params }: { params: { userId: string } }) => {
  console.log(params.userId);
  return (
    <>
      <PreviousButton />
      <UISection>
        <div className="flex flex-col items-center gap-2">
          <UserHeader user="김부캠" />
          <MessageCount count={10} />
        </div>
        <ArrowButtons />
        <Button className="pointer-events-auto w-full md:w-1/2 xl:w-1/3">
          수정구슬 꾸미고 메세지 남기기
        </Button>
      </UISection>
      <CrystalCanvas />
    </>
  );
};

export default VisitPage;
