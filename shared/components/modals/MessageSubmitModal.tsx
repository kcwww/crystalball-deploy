'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useModal, { MessageSubmit } from '@/shared/hooks/useModal';
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
import { toast } from 'sonner';

import clientComponentFetch from '@/shared/utils/fetch/clientComponentFetch';
import { BACKEND_ROUTES } from '@/shared/constants/routes';
import { use3DModel } from '@/app/(public)/visit/[userId]/store/modelStore';
import { ERROR_MESSAGES } from '@/shared/constants/enum';
import LoadingModal from './LoadingModal';

const MessageSubmitModal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onClose, type, props } = useModal();
  const { resetModel } = use3DModel();
  const router = useRouter();

  useEffect(() => {
    return () => {
      setIsSubmitting(false);
    };
  }, []);

  if (!isOpen || type !== MODAL_TYPE.MESSAGE_SUBMIT) return null;

  const { data } = props as { data: MessageSubmit };

  const submitMessage = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await clientComponentFetch(BACKEND_ROUTES.MESSAGE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        sessionStorage.setItem('messageIsDecorated', 'true');
        sessionStorage.setItem('visitToast', 'true');
        resetModel();
        onClose();
        router.refresh();
      }
    } catch (error: any) {
      console.error(error);
      if (error.message === ERROR_MESSAGES[400])
        toast.error('수정구슬당 메세지는 30개까지만 작성 가능합니다.');
      else toast.error('메세지 전송에 실패했습니다.');
      onClose();
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="no-scrollbar rounded-lg border-none bg-primary"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle className="text-white">
            따뜻한 마음을 전달해주세요
          </DialogTitle>
          <DialogDescription>
            부적절한 내용은 제재될 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <LoadingModal isOpen={isSubmitting} />
        <DialogFooter className="gap-4">
          <Button
            variant={'secondary'}
            className="w-full"
            onClick={() => onClose()}
            disabled={isSubmitting}
          >
            닫기
          </Button>
          <button
            className="w-full rounded-lg bg-blue-400 px-4 py-2 text-white"
            style={{ backgroundColor: '#3B82F6' }}
            onClick={() => submitMessage()}
            disabled={isSubmitting}
          >
            메세지 전송하기
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageSubmitModal;
