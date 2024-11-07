'use client';

import { use3DModel } from '@/app/(public)/visit/[userId]/store/modelStore';
import { STEP } from '../[userId]/_constants/step';

const LetterPaper = ({ step }: { step: number }) => {
  const { messageColor, author, message } = use3DModel();
  return (
    <div
      className="letter-paper pointer-events-auto flex w-4/5 flex-col justify-between rounded-lg p-4 md:w-1/2"
      style={{
        backgroundColor: messageColor,
        opacity: '60%',
        lineHeight: '2rem',
      }}
    >
      <div>
        <h3
          style={{
            color: 'green',
            textShadow:
              '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
          }}
        >
          To. {step === STEP.MESSAGE_NOTE_COLOR ? '누구' : '누구'}
        </h3>
        <p
          className="text-2xl"
          style={{
            color: 'white',
            textShadow:
              '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
          }}
        >
          {step === STEP.MESSAGE_NOTE_COLOR
            ? '따뜻한 마음을 담아 메세지를 작성해 주세요.'
            : message}
        </p>
      </div>
      <h3
        className="flex w-full justify-end"
        style={{
          color: 'green',
          textShadow:
            '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
        }}
      >
        from . {step === STEP.MESSAGE_NOTE_COLOR ? '익명' : author}
      </h3>
    </div>
  );
};

export default LetterPaper;
