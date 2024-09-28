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

const IntroduceModal = () => {
  const { isOpen, onClose, type } = useModal();

  if (!isOpen || type !== MODAL_TYPE.INTRODUCE) {
    return null;
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="no-scrollbar"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle>🎅스노우볼 속 내 마음🎅</DialogTitle>
          <DialogDescription>
            📌스노우볼은 최대 5️⃣개까지 생성 가능해요👍
            <br />
            📌한 스노우볼에 편지는 최대 30개까지 담겨요💌
          </DialogDescription>
        </DialogHeader>
        <section>
          <p>👆스노우볼 클릭</p>
          <p>
            🔺확대한 스노우볼에서는 받은 편지들을 장식으로 확인할 수 있어요🎁
          </p>
          <p>🔺장식 클릭으로 편지를 확인할 수 있어요👀</p>
          <p>
            🔺스노우볼을 다시 작게 보고 싶을 때는 왼쪽 위 &lt; 표시를
            눌러주세요🎄
          </p>
        </section>

        <section>
          <p>🔒비공개 스노우볼 설정</p>
          <p>
            🔺로그인 후 자물쇠를 눌러서 스노우볼의 공개 여부를 설정할 수
            있어요🔓
          </p>
          <p>
            🔺비공개 스노우볼의 경우 스노우볼의 주인만 편지들을 열람할 수
            있어요📮
          </p>
          <p>🔺생성한 스노우볼별로 비공개 설정이 가능해요🔮</p>
        </section>

        <section>
          <p>❗아직 확인하지 않은 편지</p>
          <p>안 읽은 편지들을 확인할 수 있어요☃️</p>
        </section>

        <section>
          <p>🎉편지 AI 감정분석</p>
          <p>눈과 함께 편지의 감정들이 떨어져요❄️</p>
          <p>감정의 크기에 따라 사이즈가 달라요💫</p>
          <p>❤️긍정의 감정이 가득해요😊</p>
          <p>⭐온화한 감정으로 작성됐어요😌</p>
          <p>💧슬픈 내용이 들어있어요😢</p>
        </section>

        <section className="flex flex-col items-center">
          <p>🚨버그 및 신고는</p>
          <p>kimbukaem@gmail.com</p>
          <p>로 부탁드립니다🙇</p>
        </section>

        <DialogFooter>
          <Button className="w-full" onClick={() => onClose()}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IntroduceModal;
