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

import clientComponentFetch from '@/shared/utils/fetch/clientComponentFetch';
import { BACKEND_ROUTES } from '@/shared/constants/routes';
import { transKoreaTime } from '@/shared/utils/time/transKoreaTime';
import { toast } from 'sonner';
import useModal from '@/shared/hooks/useModal';
import { useMessage } from '@/app/(protected)/main/_store/useMessage';

const DeleteModal = ({ messageId }: { messageId: string }) => {
  const koreaTime = transKoreaTime();
  const { onClose } = useModal();
  const { setMessages, messages } = useMessage();

  const fetchDeleteMessage = async () => {
    try {
      const response = await clientComponentFetch(BACKEND_ROUTES.MESSAGE, {
        method: 'DELETE',
        body: JSON.stringify({
          messageId: messageId,
          date: koreaTime,
        }),
      });

      if (response.ok) {
        toast.success('메세지가 삭제되었습니다.');

        const newMessages = messages.filter(
          (message) => message._id !== messageId
        );
        setMessages(newMessages);
      }
    } catch (error) {
      console.error('Error deleting message : ', error);
      toast.error('메세지 삭제에 실패했습니다.');
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <CircleX className="message-close cursor-pointer" />
      </DialogTrigger>
      <DialogContent
        className="no-scrollbar"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center justify-center gap-4">
          <DialogTitle>메세지 삭제</DialogTitle>
          <DialogDescription>
            정말로 삭제하시겠습니까? 삭제된 메세지는 복구하기 어려울 수
            있습니다.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-4">
          <DialogClose
            onClick={async () => {
              await fetchDeleteMessage();
              onClose();
            }}
            className="rounded-md px-4 py-2"
            style={{ backgroundColor: '#FF4D4F', color: 'white' }}
          >
            삭제
          </DialogClose>

          <DialogClose className="rounded-md bg-gray-300 px-4 py-2">
            취소
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
