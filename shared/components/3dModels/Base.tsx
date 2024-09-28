import { BASE } from '@/shared/constants/3dModel';
import { useGLTF } from '@react-three/drei';

const Base = () => {
  const base = useGLTF(BASE.ONE).scene.clone();

  base.scale.set(1, 1, 1);
  base.position.set(0, 0, 0);
  base.children.forEach((e) => (e.receiveShadow = true));
  return <primitive object={base} />;
};

export default Base;
