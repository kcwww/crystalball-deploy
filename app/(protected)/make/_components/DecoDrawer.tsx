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

import DecorationsViewer from '@/app/(protected)/make/_components/DecorationViewer';
import { BOTTOM, DECO_TYPE, MAIN_DECORATION } from '@/shared/constants/3dModel';

import dynamic from 'next/dynamic';
import TitleForm from '@/app/(protected)/make/_components/TitleForm';
import { STEP } from '@/app/(protected)/make/_constants/step';
import { User } from '@/shared/types/user';

const ColorButton = dynamic(
  () => import('@/app/(protected)/make/_components/ColorButton')
);

const DecoDrawer = ({ step, userData }: { step: number; userData: User }) => {
  const [isOpened, setIsOpened] = useState(false);

  const drawerClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  if (
    step === STEP.MAIN_DECORATION_COLOR ||
    step === STEP.BOTTOM_DECORATION_COLOR
  )
    return (
      <ColorButton
        type={
          step === STEP.MAIN_DECORATION_COLOR
            ? DECO_TYPE.MAIN
            : DECO_TYPE.BOTTOM
        }
      />
    );

  if (step === STEP.TITLE) return <TitleForm userData={userData} />;

  const mainDecorationArray = Object.values(MAIN_DECORATION);
  const bottomDecorationArray = Object.values(BOTTOM);

  const isMain = step === STEP.MAIN_DECORATION;
  const decorations = isMain ? mainDecorationArray : bottomDecorationArray;

  return (
    <Drawer open={isOpened} onOpenChange={setIsOpened}>
      <DrawerTrigger className="pointer-events-auto transform rounded-lg bg-white p-2 px-4 transition duration-200 hover:bg-gray-300">
        {isMain ? '장식 선택하기' : '바닥 장식 선택하기'}
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center justify-center gap-8 border-none bg-primary pb-10">
        <DrawerHeader className="flex flex-col items-center gap-2">
          <DrawerTitle className="flex items-center gap-2 text-white">
            좌우로 스크롤해 장식을 선택해 주세요 <ArrowLeftRight />
          </DrawerTitle>
          <DrawerDescription>
            선택한 장식은 수정구슬에 보관되어요.
          </DrawerDescription>
        </DrawerHeader>

        <DecorationsViewer
          onClose={drawerClose}
          decorations={decorations}
          type={isMain ? DECO_TYPE.MAIN : DECO_TYPE.BOTTOM}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default DecoDrawer;
