import { toast } from 'sonner';

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
import { Button } from '@/components/ui/button';
import { transKoreaTime } from '@/shared/utils/time/transKoreaTime';
import clientComponentFetch from '@/shared/utils/fetch/clientComponentFetch';
import { BACKEND_ROUTES } from '@/shared/constants/routes';
import type { Private } from '@/shared/hooks/useModal';

const PrivateModal = () => {
  const { isOpen, onClose, type, props } = useModal();

  if (!isOpen || type !== MODAL_TYPE.PRIVATE) {
    return null;
  }
  const { data } = props as { data: Private };
  const to = data.is_private ? '공개' : '비공개';
  const from = data.is_private ? '비공개' : '공개';
  const handlePrivate = data.handlePrivate;

  const fetchPrivate = async () => {
    try {
      if (to === '공개') {
        const is_private = null;
        const response = await clientComponentFetch(BACKEND_ROUTES.CRYSTAL, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_private, crystal_id: data.crystal_id }),
        });
        if (response.ok) {
          toast.success('상태가 변경되었습니다.');
          handlePrivate();
        } else throw new Error('상태 변경에 실패했습니다.');
      } else {
        const is_private = transKoreaTime();
        const response = await clientComponentFetch(BACKEND_ROUTES.CRYSTAL, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_private, crystal_id: data.crystal_id }),
        });
        if (response.ok) {
          toast.success('상태가 변경되었습니다.');
          handlePrivate();
        } else throw new Error('상태 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      toast.error('상태 변경에 실패했습니다.');
    }

    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="no-scrollbar"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center gap-4">
          <DialogTitle>메세지 {to}</DialogTitle>
          <DialogDescription>
            현재 이 수정구슬의 메세지는 {from} 상태입니다.
          </DialogDescription>
          <div className="text-center">
            전환 버튼을 누르면 방문자들이 해당 수정구슬의 메세지를 {to} 상태로
            변경합니다.
          </div>
          <div className="text-sm" style={{ color: 'gray' }}>
            언제든지 상태를 다시 변경할 수 있습니다.
          </div>
        </DialogHeader>

        <DialogFooter className="gap-4">
          <DialogClose
            className="rounded-md bg-gray-300 px-4 py-2"
            onClick={() => onClose()}
          >
            취소
          </DialogClose>
          <Button onClick={() => fetchPrivate()}>{to}로 전환하기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrivateModal;
