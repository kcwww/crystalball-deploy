import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import { STEP } from '@/app/(protected)/make/_constants/step';
import MakeCanvas from '@/app/(protected)/make/_components/MakeCanvas';
import DecoDrawer from '@/app/(protected)/make/_components/DecoDrawer';

import UISection from '@/shared/components/ui/UISection';
import { ROUTES } from '@/shared/constants/routes';
import { User } from '@/shared/types/user';

const MakeSection = ({ userData }: { userData: User }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(() => {
    const stepParam = searchParams.get('step');
    return stepParam ? parseInt(stepParam) : STEP.MAIN_DECORATION;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDecorated = sessionStorage.getItem('isDecorated');
      if (isDecorated) {
        router.replace('/main');
        return;
      }

      const stepParam = searchParams.get('step');
      const step = stepParam ? parseInt(stepParam) : STEP.MAIN_DECORATION;

      if (isNaN(step) || step < STEP.MAIN_DECORATION || step > STEP.MAX) {
        router.replace('/make?step=1');
        return;
      }

      setStep(step);
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (userData && userData.crystal_id.length === 5)
      router.replace(ROUTES.MAIN);
  }, [router, userData]);

  const handleNext = () => {
    const nextStep = step + 1;
    router.push(`${ROUTES.MAKE}?step=${nextStep}`);
    setStep(nextStep);
  };

  return (
    <>
      <UISection>
        <div className="space-y-6  text-center">
          <div className="space-y-2">
            <h1 className="text-2xl text-white">새로운 수정 구슬 만들기</h1>
            <p className="text-xl text-white">
              수정구슬은 소중한 마음을 주고 받는 예쁜 선물 상자가 될 거예요.
            </p>
          </div>
          <Progress value={step * 20} />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-12">
          <DecoDrawer step={step} userData={userData} />

          <div className="flex w-full justify-between md:w-1/2">
            {step > 1 ? (
              <Button
                onClick={() => router.back()}
                className="pointer-events-auto bg-gray-700"
              >
                이전
              </Button>
            ) : (
              <div />
            )}
            {step < STEP.MAX ? (
              <Button
                onClick={() => handleNext()}
                className="pointer-events-auto bg-gray-700"
              >
                다음
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </UISection>
      <MakeCanvas step={step} />
    </>
  );
};

export default MakeSection;
