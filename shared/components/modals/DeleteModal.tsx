'use client';

import { CircleX } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const DeleteModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <CircleX className="message-close cursor-pointer" />
      </DialogTrigger>
      <DialogContent
        className="no-scrollbar"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle>메세지 삭제</DialogTitle>
          <DialogDescription>
            정말로 삭제하시겠습니까? 삭제된 메세지는 복구하기 어려울 수
            있습니다.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button>Delete</Button>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
