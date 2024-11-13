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
import { User } from '@/shared/types/user';
import { MAX_CRYSTAL } from '@/shared/constants/enum';
import MODAL_TYPE from '@/shared/constants/modal';

const HamburgerButton = ({ userData }: { userData: User }) => {
  const { onOpen } = useModal();
  const router = useRouter();

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
            <SheetClose
              className="rounded-md bg-primary px-4 py-2 text-white"
              onClick={() => {
                onOpenAllMessage();
              }}
            >
              모든 편지 보기
            </SheetClose>
            <Button
              onClick={() => {
                if (userData && userData.crystal_id.length >= MAX_CRYSTAL) {
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
            <Button onClick={() => signOut({ callbackUrl: ROUTES.LANDING })}>
              로그아웃
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default HamburgerButton;
