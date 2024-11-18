'use client';

import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import UISection from '@/app/(protected)/main/_components/UISection';
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
import { use3DModel } from '@/app/(protected)/make/store/modelStore';

const Main = ({ userData }: { userData: User }) => {
  const fadeOutRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState<number>(0);
  const { resetModel } = use3DModel();

  const { data, isLoading, isError } = useQuery<Crystal[]>({
    queryKey: ['crystal'],
    queryFn: () => fetchCrystal(userData._id),
    gcTime: 0,
  });

  useEffect(() => {
    const resetIfZoomed = () => {
      if (window.visualViewport && window.visualViewport.scale !== 1) {
        document.body.style.zoom = '100%';
      }
    };

    resetIfZoomed();

    resetModel();
  }, [resetModel]);

  if (isLoading || isError) return null;
  if (!data) return null;

  const crystalCount = data.length;
  const messageCount = data.reduce((acc, cur) => {
    if (cur === null || cur === undefined) return acc;
    return acc + cur.message_id.length;
  }, 0);

  return (
    <>
      <UISection ref={fadeOutRef}>
        <PreviousButton />
        <HamburgerButton userData={userData} />
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
          <FullScreen fadeOutRef={fadeOutRef} />
          <ShareLink userId={userData.uuid} />
        </div>
      </UISection>

      <CrystalCanvas data={data || []} current={current} />
    </>
  );
};

export default Main;
