'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

import CrystalCanvas from '@/shared/components/canvas/CrystalCanvas';
import UISection from '@/shared/components/ui/UISection';
import UserHeader from '@/shared/components/ui/UserHeader';
import MessageCount from '@/app/(public)/visit/_components/MessageCount';

import PreviousButton from '@/shared/components/ui/PreviousButton';
import ArrowButtons from '../_components/ArrowButtons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const VisitPage = ({ params }: { params: { userId: string } }) => {
  useEffect(() => {
    const isMaked = sessionStorage.getItem('visitToast');

    if (isMaked) {
      toast.success('메세지가 성공적으로 전송되었습니다.');
      sessionStorage.removeItem('visitToast');
    }
  }, []);
  return (
    <>
      <PreviousButton />
      <UISection>
        <div className="flex flex-col items-center gap-2">
          <UserHeader user="김부캠" />
          <MessageCount count={10} />
        </div>
        <ArrowButtons />
        <Button
          className="pointer-events-auto w-full md:w-1/2 xl:w-1/3"
          onClick={() => {
            sessionStorage.removeItem('messageIsDecorated');
          }}
        >
          <Link
            href="/visit/[userId]/message"
            as={`/visit/${params.userId}/message`}
          >
            수정구슬 꾸미고 메세지 남기기
          </Link>
        </Button>
      </UISection>
      <CrystalCanvas />
    </>
  );
};

export default VisitPage;
