'use client';

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
  userId: string;
  uuid: string;
  crystalId: string;
  index: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const STEP_MESSAGE = [
    '',
    '아래 장식 선택하기 버튼을 눌러 장식을 선택해주세요.',
    '아래 색상 변경 버튼을 눌러 색상을 변경해주세요.',
    '아래 색상 변경 버튼을 눌러 편지지 색상을 변경해주세요.',
    '아래 창에 메세지와 보내는 이를 입력해 메세지를 작성해주세요.',
  ] as const;

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
        <div className="space-y-6  text-center">
          <div className="space-y-2">
            <h1 className="text-2xl text-white">메세지 전송하기</h1>
            <p className="text-xl text-white">
              전송한 메세지는 수정 구슬 속 예쁜 장식이 될 거예요.
            </p>
            <p className="text-gray-400">{STEP_MESSAGE[step]}</p>
          </div>
          <Progress value={step * 25} />
        </div>
        {step >= STEP.MESSAGE_NOTE_COLOR && <LetterPaper step={step} />}
        <div className="flex w-full flex-col items-center justify-center gap-12">
          <div className="flex w-full justify-between md:w-1/2">
            {step > 1 ? (
              <Button
                onClick={() => router.back()}
                className="pointer-events-auto w-[55px] bg-gray-700"
              >
                이전
              </Button>
            ) : (
              <div className="w-[55px]" />
            )}
            <DecoDrawer
              step={step}
              userId={userId}
              uuid={uuid}
              crystalId={crystalId}
            />
            {step < STEP.MAX ? (
              <Button
                onClick={() => handleNext()}
                className="pointer-events-auto w-[55px] bg-gray-700"
              >
                다음
              </Button>
            ) : (
              <div className="w-[55px]" />
            )}
          </div>
        </div>
      </UISection>
      <MakeCanvas step={step} />
    </>
  );
};

export default Make;
