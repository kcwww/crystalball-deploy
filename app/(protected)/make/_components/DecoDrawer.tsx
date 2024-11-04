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

import Decoration from '@/app/(protected)/make/_components/Decoration';
import { BOTTOM, DECO_TYPE, MAIN_DECORATION } from '@/shared/constants/3dModel';

import dynamic from 'next/dynamic';
import TitleForm from '@/app/(protected)/make/_components/TitleForm';

const ColorButton = dynamic(
  () => import('@/app/(protected)/make/_components/ColorButton')
);

const stepDetails = [
  '장식 선택하기',
  '장식 색상 바꾸기',
  '받침대 선택하기',
  '받침대 색상 바꾸기',
  '수정구슬 이름 등록하기',
];

const DecoDrawer = ({ step }: { step: number }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (step === 2 || step === 4)
    return (
      <ColorButton type={step === 2 ? DECO_TYPE.MAIN : DECO_TYPE.BOTTOM} />
    );

  if (step === 5) return <TitleForm />;

  const mainDecorationArray = Object.values(MAIN_DECORATION);
  const bottomDecorationArray = Object.values(BOTTOM);

  return (
    <Drawer>
      <DrawerTrigger className="pointer-events-auto transform rounded-lg bg-white p-2 px-4 transition duration-200 hover:bg-gray-300">
        {stepDetails[step - 1]}
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
          {step === 1 &&
            mainDecorationArray.map((deco, index) => (
              <Decoration key={index} path={deco} type={DECO_TYPE.MAIN} />
            ))}

          {step === 3 &&
            bottomDecorationArray.map((deco, index) => (
              <Decoration key={index} path={deco} type={DECO_TYPE.BOTTOM} />
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
