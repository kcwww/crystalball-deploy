'use client';

import { useQueryClient } from '@tanstack/react-query';

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

import clientComponentFetch from '@/shared/utils/fetch/clientComponentFetch';
import { BACKEND_ROUTES } from '@/shared/constants/routes';
import { transKoreaTime } from '@/shared/utils/time/transKoreaTime';
import { toast } from 'sonner';

const MessageListModal = () => {
  const { isOpen, onClose, type, props } = useModal();

  const queryClient = useQueryClient();

  if (!isOpen || type !== MODAL_TYPE.ALL_MESSAGE) {
    return null;
  }

  const messageLists = props.data as Message[];

  const fetchDeleteMessage = async (messageId: string) => {
    const koreaTime = transKoreaTime();
    try {
      const response = await clientComponentFetch(BACKEND_ROUTES.MESSAGE, {
        method: 'DELETE',
        body: JSON.stringify({
          messageId: messageId,
          date: koreaTime,
        }),
      });

      if (response.ok) {
        toast.success('메세지가 삭제되었습니다.');

        const crystalId = messageLists.find(
          (message) => message._id === messageId
        )?.crystal_id;
        const userId = messageLists.find(
          (message) => message._id === messageId
        )?.user_id;
        queryClient.invalidateQueries({
          queryKey: ['messages', crystalId],
        });
        queryClient.invalidateQueries({
          queryKey: ['crystal', userId],
        });
      }
    } catch (error) {
      console.error('Error deleting message : ', error);
      toast.error('메세지 삭제에 실패했습니다.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="no-scrollbar message-list-modal"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle className="text-white">메세지 리스트</DialogTitle>
          <DialogDescription>모든 메세지를 확인해보세요 !</DialogDescription>
        </DialogHeader>
        <div className="message-list flex flex-col gap-4">
          {messageLists.map((message, index) => (
            <div
              key={index + message._id}
              style={{
                backgroundColor: message.letter_color,
              }}
              className="message flex flex-col justify-between rounded-lg p-4"
            >
              <div>
                <DeleteModal
                  messageId={message._id}
                  onClose={onClose}
                  fetchDeleteMessage={fetchDeleteMessage}
                />
                <div
                  className="break-words text-2xl text-white"
                  style={{
                    paddingTop: '2rem',
                    paddingBottom: '2rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    textShadow:
                      '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
                  }}
                >
                  {message.content.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between gap-1">
                <div
                  className="flex justify-end gap-2 text-xl md:justify-start"
                  style={{
                    color: 'rgba(34,197,94,1)',
                    textShadow:
                      '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
                  }}
                >
                  <p style={{ color: 'rgba(156, 163, 175, 1)' }}>From . </p>
                  {message.sender}
                </div>
                <div
                  className="flex justify-end text-xl"
                  style={{
                    color: 'rgba(254, 202, 202, 1)',
                    textShadow:
                      '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
                  }}
                >
                  {formattedTime(message.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            variant={'secondary'}
            className="w-full"
            onClick={() => onClose()}
          >
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageListModal;
