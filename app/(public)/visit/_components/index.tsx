'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';

import CrystalCanvas from '@/app/(public)/visit/_components/CrystalCanvas';
import MessageCount from '@/app/(public)/visit/_components/MessageCount';
import ArrowButtons from '@/app/(public)/visit/_components/ArrowButtons';

import UISection from '@/shared/components/ui/UISection';
import UserHeader from '@/shared/components/ui/UserHeader';
import PreviousButton from '@/shared/components/ui/PreviousButton';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/constants/routes';
import { UserType } from '@/shared/types/user';
import { Crystal } from '@/shared/types/crystal';
import fetchCrystal from '@/app/(protected)/main/_utils/fetchCrystal';

const Visit = ({ userData }: { userData: UserType }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const { data, isLoading, isError } = useQuery<Crystal[]>({
    queryKey: ['crystal', userData._id],
    queryFn: () => fetchCrystal(userData._id),
    gcTime: 0,
  });

  useEffect(() => {
    const isMaked = sessionStorage.getItem('visitToast');

    if (isMaked) {
      toast.success('메세지가 성공적으로 전송되었습니다.');
      sessionStorage.removeItem('visitToast');
    }
  }, []);

  const checkMaxCount = useCallback(() => {
    if (!data) return false;
    const currentCrystal = data[current];
    const messageCounts = currentCrystal.message_id.length;
    const MAX_MEESAGE_COUNT = 30;
    if (messageCounts >= MAX_MEESAGE_COUNT) {
      toast.error('수정구슬 당 메세지는 30개까지만 작성 가능합니다.');
      return false;
    }
    return true;
  }, [data, current]);

  if (isLoading || isError) return null;
  if (!data) return null;

  return (
    <>
      <PreviousButton />
      <UISection>
        <div className="flex flex-col items-center gap-2">
          <UserHeader user={userData.username!} />
          <MessageCount count={data[current].message_id.length} />
        </div>
        <ArrowButtons
          maxIndex={data.length - 1}
          current={current}
          handleCurrent={setCurrent}
        />
        <div className="space-y-4 md:flex md:w-1/2 md:flex-col md:gap-4">
          <Button
            variant={'secondary'}
            className="visitor-onboarding-message pointer-events-auto w-full"
            onClick={() => {
              if (checkMaxCount()) {
                sessionStorage.removeItem('messageIsDecorated');
                router.push(ROUTES.MESSAGE(userData.uuid, String(current)));
              }
            }}
          >
            {userData.username} 님의 수정구슬 꾸미고 메세지 남기기
          </Button>
          <Button className="pointer-events-auto w-full ">
            <Link href={ROUTES.LANDING} className="w-full" prefetch={true}>
              나의 수정 구슬 만들러 가기
            </Link>
          </Button>
        </div>
      </UISection>
      <CrystalCanvas userData={data[current]} />
    </>
  );
};

export default Visit;
