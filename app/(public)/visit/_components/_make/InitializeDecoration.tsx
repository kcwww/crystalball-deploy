import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useEffect } from 'react';

const InitializeDecoration = ({ path }: { path: string }) => {
  const { scene } = useGLTF(path);
  const deco = scene.clone() as Group;

  useEffect(() => {
    deco.name = 'MessageDeco';
    deco.scale.set(3, 3, 3);
    deco.position.set(0, -1.5, 0);

    deco.rotation.set(0, Math.PI, 0);
    deco.children.forEach((mesh) => (mesh.castShadow = false));

    // Deco 컴포넌트가 언마운트될 때 클린업을 위해 제거
    return () => {
      // TODO: 필요 시 클린업 로직 추가
    };
  }, [deco]);

  useFrame((_, delta) => {
    deco.rotation.y += delta;
    if (deco.rotation.y > Math.PI * 2) deco.rotation.y = 0;
  });

  return <primitive object={deco} />;
};

export default InitializeDecoration;
