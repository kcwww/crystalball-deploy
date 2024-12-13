'use client';

import { useRouter } from 'next/navigation';

import React from 'react';
import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import { toast } from 'sonner';
import { signOut } from 'next-auth/react';

import fetchAllMessages from '@/app/(protected)/main/_utils/fetchAllMessages';

import useModal from '@/shared/hooks/useModal';
import { ROUTES } from '@/shared/constants/routes';
import { UserType } from '@/shared/types/user';
import { MAX_CRYSTAL } from '@/shared/constants/enum';
import MODAL_TYPE from '@/shared/constants/modal';
import { CURRENT_YEAR } from '@/shared/constants/Date';
import { CURRENT_SEASON } from '@/shared/constants/Date';

const HamburgerButton = ({ userData }: { userData: UserType }) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const crystal = userData.crystal_id?.get(CURRENT_YEAR)?.[CURRENT_SEASON];

  const onOpenAllMessage = async () => {
    try {
      const messages = await fetchAllMessages(userData._id);
      if (messages.length === 0) {
        toast.error('메세지가 없습니다.');
        return;
      }
      onOpen(MODAL_TYPE.ALL_MESSAGE, { data: messages });
    } catch (error) {
      toast.error('메세지를 불러오는데 실패했습니다.');
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Menu
            className="main-onboarding-hamburger pointer-events-auto fixed h-12 w-12 items-center justify-center rounded-full bg-transparent p-2 text-gray-100 hover:text-blue-400"
            style={{ cursor: 'pointer', zIndex: 1, top: '2rem', right: '2rem' }}
          />
        </SheetTrigger>
        <SheetContent
          className="border-none bg-primary"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <SheetHeader className="py-4">
            <SheetTitle className="flex justify-center gap-2 text-gray-100">
              <p className="text-yellow-200">{userData.username}</p> 님
            </SheetTitle>
            <SheetDescription className="text-center text-green-300">
              나의 수정구슬 {crystal ? crystal.length : 0}개
            </SheetDescription>
            <SheetDescription className="text-center">
              수정 구슬은 최대 {MAX_CRYSTAL}개까지 만들 수 있습니다.
            </SheetDescription>
          </SheetHeader>
          <div className="flex w-full flex-col gap-6">
            <SheetClose
              className="transform rounded-md bg-white px-4 py-2 transition duration-200 hover:bg-gray-200"
              onClick={() => {
                onOpenAllMessage();
              }}
            >
              모든 편지 보기
            </SheetClose>
            <Button
              variant={'secondary'}
              onClick={() => {
                if (crystal && crystal.length >= MAX_CRYSTAL) {
                  toast.error('더 이상 수정구슬을 만들 수 없습니다.');
                  return;
                }
                sessionStorage.removeItem('isDecorated');
                router.push('/make');
              }}
            >
              새로운 수정구슬 만들기
            </Button>
            {/* <Button
              onClick={() => {
                onOpen(MODAL_TYPE.FORM);
              }}
            >
              내 정보 수정
            </Button> */}
            <Button
              variant={'secondary'}
              onClick={() => onOpen(MODAL_TYPE.INTRODUCE)}
            >
              서비스 소개 보기
            </Button>
            <Button
              variant={'destructive'}
              onClick={() => signOut({ callbackUrl: ROUTES.LANDING })}
            >
              로그아웃
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default HamburgerButton;
