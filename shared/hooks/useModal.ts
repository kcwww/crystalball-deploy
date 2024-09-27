import { create } from 'zustand';
import { MessageType } from '@/shared/components/canvas/Decoration';

export type ModalType = 'Intro' | 'Guest' | 'Message';

export interface ModalProps {
  data?: MessageType;
}

interface ModalStore {
  type: ModalType | null;
  props: ModalProps;
  isOpen: boolean;
  onOpen: (type: ModalType, props?: ModalProps) => void;
  onClose: () => void;
}

const useModal = create<ModalStore>((set) => ({
  type: null,
  props: {},
  isOpen: false,
  onOpen: (type, props) => set({ type, props, isOpen: true }),
  onClose: () => set({ type: null, props: {}, isOpen: false }),
}));

export default useModal;
