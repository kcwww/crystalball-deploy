import mongoose from 'mongoose';

import { useState, useCallback } from 'react';
import { ArrowLeftRight } from 'lucide-react';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import ColorButton from '@/app/(public)/visit/_components/_make/ColorButton';
import MessageForm from '@/app/(public)/visit/_components/_make/MessageForm';
import { STEP } from '@/app/(public)/visit/[userId]/_constants/step';
import { DECO } from '@/shared/constants/3dModel';
import DecorationsViewer from './DecorationViewer';

const DecoDrawer = ({
  step,
  userId,
  uuid,
  crystalId,
}: {
  step: number;
  userId: string | mongoose.Schema.Types.ObjectId;
  uuid: string;
  crystalId: string | mongoose.Schema.Types.ObjectId;
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const drawerClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  if (
    step === STEP.MESSAGE_DECORATION_COLOR ||
    step === STEP.MESSAGE_NOTE_COLOR
  )
    return <ColorButton step={step} />;

  if (step === STEP.MESSAGE)
    return (
      <MessageForm
        userId={userId}
        uuid={uuid}
        crystalId={crystalId}
        step={step}
      />
    );

  const decorationArray = Object.values(DECO);

  return (
    <Drawer open={isOpened} onOpenChange={setIsOpened}>
      <DrawerTrigger className="pointer-events-auto transform rounded-lg bg-white p-2 px-4 transition duration-200 hover:bg-gray-300">
        장식 선택하기
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center justify-center gap-8 border-none bg-primary pb-10">
        <DrawerHeader className="flex flex-col items-center gap-4">
          <DrawerTitle className="flex items-center gap-2 text-white">
            좌우로 스크롤해 장식을 선택해 주세요 <ArrowLeftRight />
          </DrawerTitle>
          <DrawerDescription>
            선택한 장식은 수정구슬에 보관되어요.
          </DrawerDescription>
        </DrawerHeader>

        <DecorationsViewer
          onClose={drawerClose}
          decorations={decorationArray}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default DecoDrawer;
