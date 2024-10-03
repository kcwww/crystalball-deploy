'use client';

import { signIn } from 'next-auth/react';

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
import { Button } from '@/components/ui/button';
import useModal from '@/shared/hooks/useModal';

const IntroButtonSection = () => {
  const { onOpen } = useModal();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button className="pointer-events-auto" onClick={() => onOpen('Intro')}>
        소개
      </Button>
      <Drawer>
        <DrawerTrigger className="pointer-events-auto rounded bg-primary p-2 px-4 text-sm text-white">
          시작하기
        </DrawerTrigger>
        <DrawerContent className="p-4">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <Button
              onClick={() => signIn('google')}
              className="w-1/2"
              variant="outline"
            >
              구글로 로그인
            </Button>
            <Button className="w-1/2" variant="outline">
              네이버로 로그인
            </Button>
            <Button className="w-1/2" variant="outline">
              카카오로 로그인
            </Button>
            <Button
              onClick={() => onOpen('Guest')}
              className="w-1/2"
              variant="outline"
            >
              게스트로 로그인
            </Button>
          </div>
          <DrawerFooter className="flex items-center justify-center ">
            <DrawerClose className="w-1/3 rounded-md bg-primary py-2 text-white">
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default IntroButtonSection;
