import { BOTTOM, MAIN_DECORATION } from '@/shared/constants/3dModel';
import { create } from 'zustand';

export type setModelType = {
  model: string;
  modelColor: string;
  bottom: string;
  bottomColor: string;
  title: string;
};

interface ModelStore {
  model: string;
  modelColor: string;
  bottom: string;
  bottomColor: string;
  title: string;
  setModel: (newModel: Pick<setModelType, 'model'>) => void;
  setModelColor: (newModelColor: Pick<setModelType, 'modelColor'>) => void;
  setBottom: (newBottom: Pick<setModelType, 'bottom'>) => void;
  setBottomColor: (newBottomColor: Pick<setModelType, 'bottomColor'>) => void;
  setTitle: (newTitle: Pick<setModelType, 'title'>) => void;
  resetModel: () => void;
}

export const use3DModel = create<ModelStore>((set) => ({
  model: MAIN_DECORATION.DUCK.path,
  bottom: BOTTOM.DEFAULT.path,
  modelColor: '#ff0000',
  bottomColor: '#ff0000',
  title: 'title',
  setModel: (newModel) =>
    set((prev: ModelStore) => ({ ...prev, model: newModel.model })),
  setModelColor: (newModelColor) =>
    set((prev: ModelStore) => ({
      ...prev,
      modelColor: newModelColor.modelColor,
    })),
  setBottom: (newBottom) =>
    set((prev: ModelStore) => ({ ...prev, bottom: newBottom.bottom })),
  setBottomColor: (newBottomColor) =>
    set((prev: ModelStore) => ({
      ...prev,
      bottomColor: newBottomColor.bottomColor,
    })),
  setTitle: (newTitle) =>
    set((prev: ModelStore) => ({ ...prev, title: newTitle.title })),

  resetModel: () =>
    set({
      model: MAIN_DECORATION.DUCK.path,
      bottom: BOTTOM.DEFAULT.path,
      modelColor: '#ff0000',
      bottomColor: '#ff0000',
      title: 'title',
    }),
}));
