'use client';

import React from 'react';
import { Menu } from 'lucide-react';

import useModal from '@/shared/hooks/useModal';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const HamburgerButton = () => {
  const { onOpen } = useModal();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Menu
            className="fixed h-12 w-12 items-center justify-center rounded-full bg-transparent p-2 hover:text-blue-400"
            style={{ cursor: 'pointer', zIndex: 1, top: '2rem', right: '2rem' }}
          />
        </SheetTrigger>
        <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <div className="flex w-full flex-col gap-2">
            <Button
              onClick={() => {
                onOpen('AllMessage');
              }}
            >
              모든 편지 보기
            </Button>
            <Button
              onClick={() => {
                onOpen('Form');
              }}
            >
              내 정보 수정
            </Button>
            <Button>로그아웃</Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default HamburgerButton;
