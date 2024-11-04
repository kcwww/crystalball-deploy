'use client';

import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

import { Mesh, Group } from 'three';

import { makeColorChangedMaterial } from '@/shared/components/3dModels/utils/model';
import { use3DModel } from '@/app/(protected)/make/store/modelStore';

const MainDecoration = () => {
  const { model, modelColor } = use3DModel();

  const deco = useGLTF(model).scene.clone() as Group;

  const isStoppedRef = useRef<boolean>(false);

  useEffect(() => {
    isStoppedRef.current = false;
  }, [deco]);

  deco.name = 'MainDeco';
  deco.scale.set(1, 1, 1);
  deco.position.set(0, 1.5, 0);
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
