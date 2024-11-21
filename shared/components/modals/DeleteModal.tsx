'use client';

import { MailX } from 'lucide-react';
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

const DeleteModal = ({
  messageId,
  onClose,
  fetchDeleteMessage,
}: {
  messageId: string;
  onClose: () => void;
  fetchDeleteMessage: (messageId: string) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="flex w-full justify-end">
        <MailX className="message-close cursor-pointer" />
      </DialogTrigger>
      <DialogContent
        className="no-scrollbar rounded-lg border-none bg-primary"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center justify-center gap-4">
          <DialogTitle className="text-xl text-white">메세지 삭제</DialogTitle>
          <DialogDescription>
            정말로 삭제하시겠습니까? 삭제된 메세지는 복구하기 어려울 수
            있습니다.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-4">
          <DialogClose
            onClick={async () => {
              await fetchDeleteMessage(messageId);
              onClose();
            }}
            className="rounded-md px-8 py-2"
            style={{ backgroundColor: '#FF4D4F', color: 'white' }}
          >
            삭제
          </DialogClose>

          <DialogClose className="rounded-md bg-gray-50 px-8 py-2">
            취소
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
