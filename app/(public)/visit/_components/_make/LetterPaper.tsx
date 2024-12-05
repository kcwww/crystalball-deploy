'use client';

import { use3DModel } from '@/app/(public)/visit/[userId]/store/modelStore';
import { STEP } from '@/app/(public)/visit/[userId]/_constants/step';

import { transKoreaTime } from '@/shared/utils/time/transKoreaTime';

const LetterPaper = ({ step }: { step: number }) => {
  const { messageColor, author, message } = use3DModel();

  return (
    <div
      className="letter-paper pointer-events-auto my-8 flex w-4/5 flex-col justify-between rounded-lg p-4 md:w-1/2"
      style={{
        backgroundColor: messageColor,
        opacity: '80%',
        lineHeight: '2rem',
      }}
    >
      <div>
        <div
          className="p-4 text-2xl"
          style={{
            color: 'white',
            textShadow:
              '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
          }}
        >
          {step === STEP.MESSAGE_NOTE_COLOR
            ? '따뜻한 마음을 담은 메세지 입니다.'
            : message
              ? message
                  .split('\n')
                  .map((line, index) => <p key={index}>{line}</p>)
              : '아래 입력창에 메세지를 입력해주세요.'}
        </div>
      </div>
      <div
        className="flex flex-col text-xl"
        style={{
          textShadow:
            '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
        }}
      >
        <h3 className="flex flex-1 justify-end text-red-100">
          {step === STEP.MESSAGE_NOTE_COLOR
            ? '2025-12-25 00:00'
            : transKoreaTime()}
        </h3>
        <h3 className="flex w-full flex-1 justify-end gap-2 text-gray-300">
          <p>From</p>
          <p className="text-green-500">
            {step === STEP.MESSAGE_NOTE_COLOR && '보내는 이'}
            {step !== STEP.MESSAGE_NOTE_COLOR &&
              (author === '' ? '보내는 이' : author)}
          </p>
        </h3>
      </div>
    </div>
  );
};

export default LetterPaper;
