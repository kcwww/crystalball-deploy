import ModalProvider from '@/shared/components/providers/ModalProvider';
import { Toaster } from 'sonner';

const UISection = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="ui-section">
      {children}
      <ModalProvider />
      <Toaster />
    </section>
  );
};

export default UISection;
