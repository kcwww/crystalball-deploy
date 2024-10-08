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
import MODAL_TYPE from '@/shared/constants/modal';
import UserForm from '@/app/(protected)/main/_components/ui/UserForm';

const FormModal = () => {
  const { isOpen, onClose, type } = useModal();

  if (!isOpen || type !== MODAL_TYPE.FORM) {
    return null;
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="no-scrollbar"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle>내 정보</DialogTitle>
          <DialogDescription>내 정보를 수정할 수 있습니다.</DialogDescription>
        </DialogHeader>
        <UserForm />
        <DialogFooter>
          <Button className="w-full" onClick={() => onClose()}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
