'use client';

import { useGLTF } from '@react-three/drei';

import { Mesh, Group } from 'three';

import { makeColorChangedMaterial } from '@/shared/components/3dModels/utils/model';
import { use3DModel } from '@/app/(public)/visit/[userId]/store/modelStore';

const MessageDecoration = () => {
  const { model, modelColor } = use3DModel();

  const deco = useGLTF(model).scene.clone() as Group;

  deco.name = 'MessageDeco';
  deco.scale.set(2, 2, 2);
  deco.position.set(0, -1.0, 0);
  deco.children.forEach((mesh) => (mesh.castShadow = false));

  const colorPart = deco.getObjectByName('Main') as Mesh | undefined;
  const color = modelColor;
  if (!colorPart) {
    return null;
  }
  colorPart.material = makeColorChangedMaterial(colorPart, color);

  return <primitive object={deco} />;
};

export default MessageDecoration;
