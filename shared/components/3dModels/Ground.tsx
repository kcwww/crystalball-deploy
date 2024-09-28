import { useGLTF } from '@react-three/drei';
import { GROUND } from '@/shared/constants/3dModel';

const Ground = () => {
  const ground = useGLTF(GROUND.WINTER).scene.clone();

  ground.scale.set(20, 20, 20);
  ground.position.set(0, -5, 0);
  ground.children.forEach((e) => (e.receiveShadow = true));
  ground.castShadow = true;
  ground.receiveShadow = true;
  ground.name = 'Ground';

  return <primitive object={ground} />;
};

export default Ground;
