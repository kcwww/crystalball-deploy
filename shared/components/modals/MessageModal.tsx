import { CircleX } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import useModal from '@/shared/hooks/useModal';
import MODAL_TYPE from '@/shared/constants/modal';
import { MessageType } from '@/shared/types/message';

const MessageModal = () => {
  const { isOpen, onClose, type, props } = useModal();

  if (!isOpen || type !== MODAL_TYPE.MESSAGE) {
    return null;
  }
  const { data } = props;

  if (!data) return null;

  const { sender, sendAt, message, letterColor } = data as MessageType;

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="no-scrollbar message"
        style={{ backgroundColor: letterColor }}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center justify-center gap-4">
          <DialogTitle>{sender}</DialogTitle>
          <DialogDescription className="flex flex-col items-center gap-2">
            {sendAt}
          </DialogDescription>
          <div>{message}</div>
        </DialogHeader>

        <DialogFooter>
          <DialogClose onClick={() => onClose()}>
            <CircleX className="message-close" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
