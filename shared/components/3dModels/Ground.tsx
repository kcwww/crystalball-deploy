import { useGLTF } from '@react-three/drei';
import { GROUND } from '@/shared/constants/3dModel';
import { Group, Mesh, MeshStandardMaterial } from 'three';
const Ground = () => {
  const ground = useGLTF(GROUND.WINTER).scene.clone() as Group;

  ground.scale.set(20, 20, 20);
  ground.position.set(0, -5, 0);
  ground.children.forEach((e) => {
    e.receiveShadow = true;
    if (e instanceof Mesh && e.material instanceof MeshStandardMaterial) {
      e.material.emissive.set(0, 0, 0);
      e.material.emissiveIntensity = 0;
    }
  });
  ground.castShadow = true;
  ground.receiveShadow = true;
  ground.name = 'Ground';

  return <primitive object={ground} />;
};

export default Ground;
