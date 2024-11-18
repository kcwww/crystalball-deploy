'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import CrystalCanvas from '@/app/(public)/visit/_components/CrystalCanvas';
import MessageCount from '@/app/(public)/visit/_components/MessageCount';
import ArrowButtons from '@/app/(public)/visit/_components/ArrowButtons';

import UISection from '@/shared/components/ui/UISection';
import UserHeader from '@/shared/components/ui/UserHeader';
import PreviousButton from '@/shared/components/ui/PreviousButton';
import { UserData } from '@/shared/types/userData';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/constants/routes';

const Visit = ({ userData }: { userData: UserData }) => {
  const [current, setCurrent] = useState(0);
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
          <UserHeader user={userData.user.username!} />
          <MessageCount count={userData.crystals[current].message_id.length} />
        </div>
        <ArrowButtons
          maxIndex={userData.user.crystal_id.length - 1}
          current={current}
          handleCurrent={setCurrent}
        />
        <div className="space-y-4 md:flex md:w-1/2 md:flex-col md:gap-4">
          <Button
            variant={'secondary'}
            className="pointer-events-auto w-full"
            onClick={() => {
              sessionStorage.removeItem('messageIsDecorated');
            }}
          >
            <Link
              href="/visit/[userId]/message"
              className="w-full"
              as={ROUTES.MESSAGE(userData.user.uuid, String(current))}
            >
              {userData.user.username} 님의 수정구슬 꾸미고 메세지 남기기
            </Link>
          </Button>
          <Button className="pointer-events-auto w-full ">
            <Link href={ROUTES.LANDING} className="w-full">
              나의 수정 구슬 만들러 가기
            </Link>
          </Button>
        </div>
      </UISection>
      <CrystalCanvas userData={userData} current={current} />
    </>
  );
};

export default Visit;
