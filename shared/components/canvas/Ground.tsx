import { useGLTF } from '@react-three/drei';

const Ground = () => {
  const ground = useGLTF('/assets/grounds/winter.glb').scene.clone();

  ground.scale.set(20, 20, 20);
  ground.position.set(0, -5, 0);
  ground.children.forEach((e) => (e.receiveShadow = true));
  ground.castShadow = true;
  ground.receiveShadow = true;
  ground.name = 'Ground';

  return <primitive object={ground} />;
};

export default Ground;
