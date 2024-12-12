'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Chrome, ColorResult, Circle } from '@uiw/react-color';
import { use3DModel } from '@/app/(public)/visit/[userId]/store/modelStore';

import { STEP } from '@/app/(public)/visit/[userId]/_constants/step';

const ColorButton = ({ step }: { step: number }) => {
  const { setModelColor, modelColor, setMessageColor, messageColor } =
    use3DModel();

  const handleColorChange = (color: ColorResult) => {
    if (step === STEP.MESSAGE_DECORATION_COLOR) {
      setModelColor({ modelColor: color.hex });
    } else if (step === STEP.MESSAGE_NOTE_COLOR) {
      setMessageColor({ messageColor: color.hex });
    }
  };

  // 색상 배열 정의
  const colors = [
    '#860A35',
    '#AF2655',
    '#FF0000',
    '#EE9322',
    '#ffae00',
    '#c8cf5c',
    '#95af54',
    '#1f831f',
    '#016A70',
    '#22668D',
    '#0E21A0',
    '#313866',
    '#504099',
    '#974EC3',
    '#9F0D7F',
  ];

  return (
    <Popover>
      <PopoverTrigger className="pointer-events-auto transform rounded-lg bg-white p-2 px-4 transition duration-200 hover:bg-gray-300">
        {step === STEP.MESSAGE_DECORATION_COLOR
          ? '모델 색상 변경'
          : '편지지 색상 변경'}
      </PopoverTrigger>
      <PopoverContent className="pointer-events-auto flex max-h-[200px] items-center justify-center">
        {step === STEP.MESSAGE_DECORATION_COLOR ? (
          <Chrome
            showAlpha={false}
            showColorPreview={false}
            showEditableInput={false}
            showEyeDropper={false}
            color={modelColor}
            onChange={(color) => handleColorChange(color)}
          />
        ) : (
          <Circle
            color={messageColor}
            colors={colors} // 색상 배열을 Circle 컴포넌트에 전달
            onChange={(color) => handleColorChange(color)}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ColorButton;
