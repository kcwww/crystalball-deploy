'use client';

import mongoose from 'mongoose';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

import UISection from '@/shared/components/ui/UISection';
import DecoDrawer from '@/app/(public)/visit/_components/_make/DecoDrawer';
import MakeCanvas from '@/app/(public)/visit/_components/_make/MakeCanvas';
import { STEP } from '@/app/(public)/visit/[userId]/_constants/step';

import LetterPaper from '@/app/(public)/visit/_components/_make/LetterPaper';
import { ROUTES } from '@/shared/constants/routes';

const Make = ({
  userId,
  uuid,
  crystalId,
  index,
}: {
  userId: string | mongoose.Schema.Types.ObjectId;
  uuid: string;
  crystalId: string | mongoose.Schema.Types.ObjectId;
  index: string;
}) => {
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
        router.replace(ROUTES.VISIT_USER(uuid));
        return;
      }

      const stepParam = searchParams.get('step');
      const step = stepParam ? parseInt(stepParam) : STEP.MESSAGE_DECORATION;

      if (isNaN(step) || step < STEP.MESSAGE_DECORATION || step > STEP.MAX) {
        router.replace(
          `${ROUTES.VISIT_USER(uuid)}/${index}?step=${STEP.MESSAGE_DECORATION}`
        );
        return;
      }

      setStep(step);
    }
  }, [searchParams, router, userId, uuid, index]);

  const handleNext = () => {
    const nextStep = step + 1;
    router.push(`${ROUTES.VISIT_USER(uuid)}/${index}?step=${nextStep}`);
    setStep(nextStep);
  };

  return (
    <>
      <UISection>
        <div className="space-y-10  text-center">
          <div className="space-y-4">
            <h1 className="text-2xl text-white">메세지 전송하기</h1>
            <p className="text-xl text-white">
              전송한 메세지는 수정 구슬 속 예쁜 장식이 될 거예요.
            </p>
          </div>
          <Progress value={step * 25} />
        </div>
        {step >= STEP.MESSAGE_NOTE_COLOR && <LetterPaper step={step} />}
        <div className="flex w-full flex-col items-center justify-center gap-12">
          <DecoDrawer
            step={step}
            userId={userId}
            uuid={uuid}
            crystalId={crystalId}
          />

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
