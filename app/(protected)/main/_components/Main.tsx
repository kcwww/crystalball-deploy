'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { toast } from 'sonner';

import UISection from '@/shared/components/ui/UISection';
import PreviousButton from '@/shared/components/ui/PreviousButton';
import UserHeader from '@/shared/components/ui/UserHeader';
import MessageCount from '@/shared/components/ui/MessageCount';
import type { User } from '@/shared/types/user';
import type { Crystal } from '@/shared/types/crystal';

import CrystalCanvas from '@/app/(protected)/main/_components/CrystalCanvas';
import ShareLink from '@/app/(protected)/main/_components/ui/ShareLink';
import FullScreen from '@/app/(protected)/main/_components/ui/FullScreen';
import HamburgerButton from '@/app/(protected)/main/_components/ui/HamburgerButton';
import fetchCrystal from '@/app/(protected)/main/_utils/fetchCrystal';
import PrivateButton from '@/app/(protected)/main/_components/ui/PrivateButton';

const Main = ({ userData }: { userData: User }) => {
  const [current, setCurrent] = useState<number>(0);

  const { data, isLoading, isError } = useQuery<Crystal[]>({
    queryKey: ['crystal'],
    queryFn: () => fetchCrystal(userData._id),
    gcTime: 0,
  });

  useEffect(() => {
    const isMaked = sessionStorage.getItem('toast');

    if (isMaked) {
      toast.success('새로운 수정구슬이 생성되었습니다!');
      sessionStorage.removeItem('toast');
    }
  }, []);

  if (isLoading || isError) return null;
  if (!data) return null;

  const crystalCount = data.length;
  const messageCount = data.reduce(
    (acc, cur) => acc + cur.message_id.length,
    0
  );

  return (
    <>
      <PreviousButton />
      <HamburgerButton userData={userData} />
      <UISection>
        <div className="flex flex-col items-center gap-2">
          <UserHeader user={userData.username || ''} />
          <MessageCount count={messageCount} />
          <PrivateButton crystal={data[current]} />
        </div>
        <div className="flex w-full justify-between md:px-16">
          {current > 0 ? (
            <ArrowLeft
              onClick={() => setCurrent((prev) => prev - 1)}
              className="pointer-events-auto transform cursor-pointer rounded-full p-1 transition duration-200 hover:bg-primary hover:text-white"
              size={'2rem'}
            />
          ) : (
            <div />
          )}
          {current < crystalCount! - 1 ? (
            <ArrowRight
              onClick={() => setCurrent((prev) => prev + 1)}
              className="pointer-events-auto transform cursor-pointer rounded-full p-1 transition duration-200 hover:bg-primary hover:text-white"
              size={'2rem'}
            />
          ) : (
            <div />
          )}
        </div>
        <div className="flex w-full justify-between">
          <FullScreen />
          <ShareLink userId={userData.uuid} />
        </div>
      </UISection>
      <CrystalCanvas data={data || []} current={current} />
    </>
  );
};

export default Main;
