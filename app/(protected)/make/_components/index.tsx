import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import MakeCanvas from '@/app/(protected)/make/_components/MakeCanvas';
import UISection from '@/shared/components/ui/UISection';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import PreviousButton from '@/shared/components/ui/PreviousButton';
import DecoDrawer from '@/app/(protected)/make/_components/DecoDrawer';

const Make = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const maxStep = 6;

  const [step, setStep] = useState(() => {
    const stepParam = searchParams.get('step');
    return stepParam ? parseInt(stepParam) : 1;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDecorated = sessionStorage.getItem('isDecorated');
      if (isDecorated) {
        router.replace('/main');
        return;
      }

      const stepParam = searchParams.get('step');
      const step = stepParam ? parseInt(stepParam) : 1;

      if (isNaN(step) || step < 1 || step > maxStep) {
        router.replace('/make?step=1');
        return;
      }

      setStep(step);
    }
  }, [searchParams, router]);

  const handleNext = () => {
    const nextStep = step + 1;
    router.push(`/make?step=${nextStep}`);
    setStep(nextStep);
  };

  return (
    <>
      <PreviousButton />
      <UISection>
        <div className="space-y-10 bg-gray-300 text-center">
          <div>
            <h1>새로운 수정 구슬 만들기</h1>
            <p>
              수정구슬은 소중한 마음을 주고 받는 예쁜 선물 상자가 될 거예요.
            </p>
          </div>
          <Progress value={step * 20} />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-12">
          <DecoDrawer step={step} />

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
            {step < maxStep - 1 ? (
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

export default Make;
