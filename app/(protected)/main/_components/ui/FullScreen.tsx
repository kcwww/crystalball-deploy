import { Fullscreen } from 'lucide-react';

const FullScreen = ({
  fadeOutRef,
}: {
  fadeOutRef: React.RefObject<HTMLDivElement>;
}) => {
  const handleFadeOut = () => {
    if (!fadeOutRef.current) return;

    // Fade-out 애니메이션 추가
    fadeOutRef.current.classList.add('animate-fade-out');

    // 클릭 이벤트 지연 처리
    setTimeout(() => {
      const handleWindowClick = () => {
        if (!fadeOutRef.current) return;
        if (!fadeOutRef.current.classList.contains('animate-fade-out')) return;
        fadeOutRef.current?.classList.remove('animate-fade-out');

        // 한 번 실행 후 이벤트 리스너 제거
        window.removeEventListener('click', handleWindowClick);
      };

      // 클릭 이벤트 추가
      window.addEventListener('click', handleWindowClick, { once: true });
    }, 300); // 300ms: 애니메이션 실행 시간에 맞게 설정
  };

  return (
    <Fullscreen
      onClick={handleFadeOut}
      className="pointer-events-auto cursor-pointer hover:text-blue-500"
      size={'2rem'}
    />
  );
};

export default FullScreen;
