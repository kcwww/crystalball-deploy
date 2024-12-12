import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { LoadingIndicator } from '@/app/loading';

const LoadingModal = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="flex flex-col items-center justify-center border-none bg-transparent"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <LoadingIndicator />
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
};

export default LoadingModal;
