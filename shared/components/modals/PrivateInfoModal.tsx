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

const PrivateInfoModal = () => {
  const { isOpen, onClose, type } = useModal();

  if (!isOpen || type !== MODAL_TYPE.PRIVATE_INFO) {
    return null;
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="no-scrollbar rounded-lg border-none bg-primary text-white"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center justify-center gap-2">
          <DialogTitle>비공개 수정구슬</DialogTitle>
          <DialogDescription>
            현재 해당 수정구슬은 비공개로 설정되어 있습니다.
            <br />
            비공개 수정구슬은 수정구슬 주인만 메세지를 확인할 수 있어요.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="block">
          <Button
            className="w-full"
            variant={'secondary'}
            onClick={() => onClose()}
          >
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrivateInfoModal;
