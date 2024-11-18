import ModalProvider from '@/shared/components/providers/ModalProvider';
import { Toaster } from 'sonner';

const UISection = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <section className="ui-section" style={{ minHeight: '100svh' }}>
        {children}
        <ModalProvider />
      </section>
      <Toaster richColors />
    </>
  );
};

export default UISection;
