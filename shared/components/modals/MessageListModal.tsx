'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import useModal from '@/shared/hooks/useModal';
import MODAL_TYPE from '@/shared/constants/modal';

import DeleteModal from '@/shared/components/modals/DeleteModal';
import { Message } from '@/shared/types/message';
import { formattedTime } from '@/shared/utils/time/formattedTime';

const MessageListModal = () => {
  const { isOpen, onClose, type, props } = useModal();

  if (!isOpen || type !== MODAL_TYPE.ALL_MESSAGE) {
    return null;
  }

  const messageLists = props.data as Message[];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="no-scrollbar message-list-modal"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle className="text-white">메세지 리스트</DialogTitle>
          <DialogDescription>모든 메세지를 확인 해보세요 !</DialogDescription>
        </DialogHeader>
        <div className="message-list flex flex-col gap-4">
          {messageLists.map((message, index) => (
            <div
              key={index}
              style={{ backgroundColor: message.letter_color }}
              className="p-4"
            >
              <div>{formattedTime(message.createdAt)}</div>
              <div>{message.content}</div>
              <div>From . {message.sender}</div>
              <DeleteModal messageId={message._id} />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button className="w-full" onClick={() => onClose()}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageListModal;
