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

const MessageModal = () => {
  const { isOpen, onClose, type, props } = useModal();

  if (!isOpen || type !== 'Message') {
    return null;
  }
  const { data } = props;

  if (!data) return null;

  const { message, sender, letterColor, sendAt } = data;

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="no-scrollbar message"
        style={{ backgroundColor: letterColor }}
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
