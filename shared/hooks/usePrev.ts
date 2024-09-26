import { create } from 'zustand';

interface PrevStore {
  view: boolean;
  isZoom: boolean;
  onIn: () => void;
  onOut: () => void;
  onZoom: (isZoom: boolean) => void;
  onZoomOut: () => void;
}

const usePrev = create<PrevStore>((set) => ({
  view: false,
  isZoom: false,
  onIn: () => set({ view: true }),
  onOut: () => set({ view: false }),
  onZoom: (isZoom) => {
    // if isZoom is true then no set
    if (isZoom) return;
    set({ isZoom: true });
  },
  onZoomOut: () => set({ isZoom: false }),
}));

export default usePrev;
