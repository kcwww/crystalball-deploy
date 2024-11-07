'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

import UISection from '@/shared/components/ui/UISection';
import DecoDrawer from '@/app/(public)/visit/_components/DecoDrawer';
import MakeCanvas from '@/app/(public)/visit/_components/MakeCanvas';
import { STEP } from '@/app/(public)/visit/[userId]/_constants/step';

import LetterPaper from './LetterPaper';

const Make = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(() => {
    const stepParam = searchParams.get('messageStep');
    return stepParam ? parseInt(stepParam) : STEP.MESSAGE_DECORATION;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDecorated = sessionStorage.getItem('messageIsDecorated');
      if (isDecorated) {
        router.replace(`/visit/${userId}`);
        return;
      }

      const stepParam = searchParams.get('step');
      const step = stepParam ? parseInt(stepParam) : STEP.MESSAGE_DECORATION;

      if (isNaN(step) || step < STEP.MESSAGE_DECORATION || step > STEP.MAX) {
        router.replace(
          `/visit/${userId}/message?step=${STEP.MESSAGE_DECORATION}`
        );
        return;
      }

      setStep(step);
    }
  }, [searchParams, router, userId]);

  const handleNext = () => {
    const nextStep = step + 1;
    router.push(`/visit/${userId}/message?step=${nextStep}`);
    setStep(nextStep);
  };

  return (
    <>
      <UISection>
        <div className="space-y-10 bg-gray-300 text-center">
          <div>
            <h1>메세지 전송하기</h1>
            <p>전송한 메세지는 수정 구슬 속 예쁜 장식이 될 거예요.</p>
          </div>
          <Progress value={step * 25} />
        </div>
        {step >= STEP.MESSAGE_NOTE_COLOR && <LetterPaper step={step} />}
        <div className="flex w-full flex-col items-center justify-center gap-12">
          <DecoDrawer step={step} userId={userId} />

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
      <MakeCanvas />
    </>
  );
};

export default Make;
