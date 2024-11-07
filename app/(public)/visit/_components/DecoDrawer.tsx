import { useState, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import Decoration from '@/app/(public)/visit/_components/Decoration';
import ColorButton from '@/app/(public)/visit/_components/ColorButton';
import MessageForm from '@/app/(public)/visit/_components/MessageForm';
import { STEP } from '@/app/(public)/visit/[userId]/_constants/step';
import { DECO } from '@/shared/constants/3dModel';

const DecoDrawer = ({ step, userId }: { step: number; userId: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (
    step === STEP.MESSAGE_DECORATION_COLOR ||
    step === STEP.MESSAGE_NOTE_COLOR
  )
    return <ColorButton step={step} />;

  if (step === STEP.MESSAGE) return <MessageForm userId={userId} step={step} />;

  const decorationArray = Object.values(DECO);
  const decorationPath = decorationArray.map((deco) => deco.fileName);

  return (
    <Drawer>
      <DrawerTrigger className="pointer-events-auto transform rounded-lg bg-white p-2 px-4 transition duration-200 hover:bg-gray-300">
        장식 선택하기
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center justify-center">
        <DrawerHeader className="flex flex-col items-center">
          <DrawerTitle className="flex gap-2">
            좌우로 스크롤해 장식을 선택해 주세요. <ArrowLeftRight />
          </DrawerTitle>
          <DrawerDescription>
            선택한 장식은 수정구슬에 보관되어요.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex w-full overflow-auto">
          {decorationPath.map((deco, index) => (
            <Decoration key={index} path={deco} />
          ))}
        </div>

        <DrawerFooter>
          <DrawerClose className="transform rounded-lg border-2 border-gray-400 p-2 px-4 transition duration-200 hover:bg-gray-300">
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DecoDrawer;
