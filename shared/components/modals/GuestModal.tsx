'use client';

import useModal from '@/shared/hooks/useModal';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import MODAL_TYPE from '@/shared/constants/modal';

const GuestModal = () => {
  const { isOpen, onClose, type } = useModal();

  if (!isOpen || type !== MODAL_TYPE.GUEST) {
    return null;
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="no-scrollbar"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center justify-center gap-4">
          <DialogTitle>게스트 로그인</DialogTitle>
          <div>
            <p>
              게스트로 로그인시에 나만의 스노우볼 URL 주소을 따로 저장해두어야
              해요.
            </p>
            <p>
              나만의 스노우볼 URL 주소를 기억하시지 못할때에는 기존 스노우볼을
              찾기 어려울 수 있어요.
            </p>
          </div>
          <DialogDescription className="flex flex-col items-center gap-2">
            게스트 유저는 시즌이 지나면 데이터가 초기화 될 수 있습니다.
            <br />
            언제든 로그인을 통해 기존 데이터를 유지할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button className="w-full" onClick={() => onClose()}>
            게스트로 시작하기
          </Button>
          <Button className="w-1/3" onClick={() => onClose()}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GuestModal;
