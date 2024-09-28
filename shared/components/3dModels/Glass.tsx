import { Sphere } from '@react-three/drei';
import { Color, Vector3 } from 'three';

import { RADIUS } from '@/shared/constants/canvas';

const Glass = () => {
  const color = new Color('white');
  const position = new Vector3(0, RADIUS / 2, 0);

  return (
    <Sphere
      args={[RADIUS, 36, 32]}
      position={position}
      castShadow={true}
      receiveShadow={true}
      name="glass"
    >
      <meshStandardMaterial
        transparent={true}
        color={color}
        opacity={0.1}
        roughness={0}
        metalness={1}
      />
    </Sphere>
  );
};

export default Glass;
