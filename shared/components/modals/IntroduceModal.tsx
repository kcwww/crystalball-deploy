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
import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

const IntroduceModal = () => {
  const { isOpen, onClose, type } = useModal();

  if (!isOpen || type !== MODAL_TYPE.INTRODUCE) {
    return null;
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="no-scrollbar border-none bg-primary text-white"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle>🎅수정구슬 속 내 마음🎅</DialogTitle>
          <DialogDescription>
            📌수정구슬은 최대 5️⃣개까지 생성 가능해요👍
            <br />
            📌한 수정구슬에 편지는 최대 30개까지 담겨요💌
          </DialogDescription>
        </DialogHeader>
        <section>
          <p>👆수정구슬 클릭</p>
          <p>
            🔺확대한 수정구슬에서는 받은 편지들을 장식으로 확인할 수 있어요🎁
          </p>
          <p>🔺장식 클릭으로 편지를 확인할 수 있어요👀</p>
          <p className="flex gap-1">
            🔺수정구슬을 다시 작게 보고 싶을 때는 왼쪽 위 <ArrowLeftCircle />{' '}
            표시를 눌러주세요🎄
          </p>
        </section>

        <section>
          <p>🔒비공개 수정구슬 설정</p>
          <p>
            🔺로그인 후 자물쇠를 눌러서 수정구슬의 공개 여부를 설정할 수
            있어요🔓
          </p>
          <p>
            🔺비공개 수정구슬의 경우 수정구슬의 주인만 편지들을 열람할 수
            있어요📮
          </p>
          <p>🔺생성한 수정구슬별로 비공개 설정이 가능해요🔮</p>
        </section>

        <section>
          <p>❗아직 확인하지 않은 편지</p>
          <p>안 읽은 편지들을 확인할 수 있어요☃️</p>
        </section>

        {/* <section>
          <p>🎉편지 AI 감정분석</p>
          <p>눈과 함께 편지의 감정들이 떨어져요❄️</p>
          <p>감정의 크기에 따라 사이즈가 달라요💫</p>
          <p>❤️긍정의 감정이 가득해요😊</p>
          <p>⭐온화한 감정으로 작성됐어요😌</p>
          <p>💧슬픈 내용이 들어있어요😢</p>
        </section> */}

        <section className="flex flex-col items-center">
          <p>🚨버그 및 신고는</p>
          <Link className="hover:underline" href={'mailto:sscok1103@gmail.com'}>
            ssock1103@gmail.com
          </Link>
          <p>로 부탁드립니다🙇</p>
        </section>

        <DialogFooter>
          <Button
            className="w-full"
            variant={'secondary'}
            onClick={() => onClose()}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IntroduceModal;
