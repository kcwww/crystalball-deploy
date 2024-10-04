'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const HamburgerButton = () => {
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
        </SheetContent>
      </Sheet>
    </>
  );
};

export default HamburgerButton;
