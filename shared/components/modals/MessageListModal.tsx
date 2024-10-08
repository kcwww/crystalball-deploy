'use client';

import useModal from '@/shared/hooks/useModal';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import MODAL_TYPE, { MSG_COLOR } from '@/shared/constants/modal';

import { messageLists } from '../canvas/dummy';
import DeleteModal from './DeleteModal';

const MessageListModal = () => {
  const { isOpen, onClose, type } = useModal();

  if (!isOpen || type !== MODAL_TYPE.ALL_MESSAGE) {
    return null;
  }

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
              style={{ backgroundColor: MSG_COLOR[message.letter_id].color }}
              className="p-4"
            >
              <div>{message.sendAt}</div>
              <div>{message.content}</div>
              <div>From . {message.sender}</div>
              <DeleteModal />
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
