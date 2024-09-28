import { create } from 'zustand';

interface PrevStore {
  view: boolean;
  isZoom: boolean;
  onIn: () => void;
  onOut: () => void;
  onZoom: () => void;
  onZoomOut: () => void;
}

const usePrev = create<PrevStore>((set) => ({
  view: false,
  isZoom: false,
  onIn: () => {
    set({ view: true });
  },
  onOut: () => {
    set({ view: false });
  },
  onZoom: () => {
    set({ isZoom: true });
  },
  onZoomOut: () => {
    set({ isZoom: false });
  },
}));

export default usePrev;
