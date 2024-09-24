import ModalProvider from '@/shared/provider/ModalProvider';

const UISection = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      style={{
        minHeight: '100dvh',
        zIndex: 1,
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5rem ',
      }}
    >
      {children}
      <ModalProvider />
    </section>
  );
};

export default UISection;
