'use client';

import { useGLTF } from '@react-three/drei';

import { Mesh, Group } from 'three';

import { makeColorChangedMaterial } from '@/shared/components/3dModels/utils/model';
import { use3DModel } from '@/app/(protected)/make/store/modelStore';
import { STEP } from '@/app/(protected)/make/_constants/step';

const MainDecoration = ({ step }: { step: number }) => {
  const { model, modelColor } = use3DModel();

  const deco = useGLTF(model).scene.clone() as Group;

  deco.name = 'MainDeco';

  if (step < STEP.BOTTOM_DECORATION) {
    deco.position.set(0, 0, 0);
    deco.scale.set(1.2, 1.2, 1.2);
  } else {
    deco.position.set(0, 1.5, 0);
    deco.scale.set(1, 1, 1);
  }
  deco.children.forEach((mesh) => (mesh.castShadow = false));

  const colorPart = deco.getObjectByName('colorPart') as Mesh | undefined;
  const color = modelColor;
  if (!colorPart) {
    return null;
  }
  colorPart.material = makeColorChangedMaterial(colorPart, color);

  return <primitive object={deco} />;
};

export default MainDecoration;
