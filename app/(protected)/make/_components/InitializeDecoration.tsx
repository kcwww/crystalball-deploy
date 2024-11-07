import { DECO_TYPE } from '@/shared/constants/3dModel';
import { DecorationType } from '@/shared/types/model';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useEffect } from 'react';

const InitializeDecoration = ({
  path,
  type,
}: {
  path: string;
  type: DecorationType;
}) => {
  const { scene } = useGLTF(path);
  const deco = scene.clone() as Group;

  useEffect(() => {
    // 모델의 초기 설정
    if (type === DECO_TYPE.MAIN) {
      deco.name = 'MainDeco';
      deco.scale.set(1, 1, 1);
      deco.position.set(0, -1.5, 0);
    } else if (type === DECO_TYPE.BOTTOM) {
      deco.name = 'Bottom';
      deco.scale.set(0.4, 0.4, 0.4);
      deco.position.set(0, 1, 0);
    }

    deco.rotation.set(0, Math.PI, 0);
    deco.children.forEach((mesh) => (mesh.castShadow = false));

    // Deco 컴포넌트가 언마운트될 때 클린업을 위해 제거
    return () => {
      // TODO: 필요 시 클린업 로직 추가
    };
  }, [type, deco]);

  useFrame((_, delta) => {
    deco.rotation.y += delta;
    if (deco.rotation.y > Math.PI * 2) deco.rotation.y = 0;
  });

  return <primitive object={deco} />;
};

export default InitializeDecoration;
