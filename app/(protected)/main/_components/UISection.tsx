import ModalProvider from '@/shared/components/providers/ModalProvider';
import { Toaster } from 'sonner';
import React from 'react';

const UISection = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  return (
    <>
      <section ref={ref} className="ui-section" style={{ minHeight: '100svh' }}>
        {children}
        <ModalProvider />
      </section>
      <Toaster richColors />
    </>
  );
});

UISection.displayName = 'UISection'; // React DevTools에서 이름을 명시적으로 표시하기 위해 설정

export default UISection;
