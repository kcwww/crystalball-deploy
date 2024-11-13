'use client';

import { MutableRefObject, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group, Vector3 } from 'three';

import { makeColorChangedMaterial } from '@/shared/components/3dModels/utils/model';
import { MAIN_DECORATION } from '@/shared/constants/3dModel';

import { UserCrystal } from '@/shared/types/userData';

const fallingModel = (
  modelRef: Group,
  speedRef: MutableRefObject<Vector3>,
  delta: number,
  isStoppedRef: MutableRefObject<boolean>
) => {
  const airResistance = 0.02;
  const acceleration = 0.3 * delta; //가속도

  if (modelRef) {
    modelRef.position.add(speedRef.current);
    speedRef.current.y -= acceleration;
    speedRef.current.y *= 1 - airResistance;

    if (modelRef.position.y <= 0.3 && Math.abs(speedRef.current.y) <= 0.05) {
      isStoppedRef.current = true;
      return;
    }

    if (modelRef.position.y <= 0) {
      speedRef.current.y *= -1;
      return;
    }
  }
};

const MainDecoration = ({ crystal }: { crystal: UserCrystal }) => {
  const path = Object.values(MAIN_DECORATION).find(
    (deco) => deco.id === crystal.main_decoration_id
  )!.path;
  const color = crystal.main_decoration_color;
  const deco = useGLTF(path).scene.clone() as Group;
  const speedRef = useRef<Vector3>(new Vector3(0, 0, 0));
  const isStoppedRef = useRef<boolean>(false);

  useEffect(() => {
    isStoppedRef.current = false;
  }, [deco]);

  deco.name = 'MainDeco';
  deco.scale.set(1, 1, 1);
  deco.position.set(0, 10, 0);
  deco.children.forEach((mesh) => (mesh.castShadow = false));

  useFrame((_, delta) => {
    if (delta > 1) {
      delta = 0;
    }
    if (!isStoppedRef.current) {
      fallingModel(deco, speedRef, delta, isStoppedRef);
    }
  });

  const colorPart = deco.getObjectByName('colorPart') as Mesh | undefined;
  if (!colorPart) {
    return null;
  }
  colorPart.material = makeColorChangedMaterial(colorPart, color);

  return <primitive object={deco} />;
};

export default MainDecoration;
