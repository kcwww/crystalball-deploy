import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';

import { RADIUS } from '@/shared/constants/canvas';

import {
  makeColorChangedMaterial,
  rotateAnimate,
  visibleInRange,
} from '@/shared/components/3dModels/utils/model';
import { SNOW_FLAKE } from '@/shared/constants/3dModel';

const randomizePosition = (
  target: Mesh,
  centerPosition: Vector3,
  radius: number
) => {
  target.position.set(
    centerPosition.x - radius + Math.random() * radius * 2,
    centerPosition.y + radius + Math.random() * radius * 2,
    centerPosition.z - radius + Math.random() * radius * 2
  );
};

const fallingAnimate = (
  target: Mesh,
  speed: number,
  centerPosition: Vector3,
  radius: number
) => {
  if (target.position.y <= -1) {
    randomizePosition(target, centerPosition, radius);
    const newScale = 0.2 + Math.random() * 0.5;
    target.scale.set(newScale, newScale, newScale);
  }
  target.position.y -= speed;
};

const snowcolor = ['#99c9fd', '#a5bbd3', '#f1faff'];

const Snowflake = () => {
  const snowRef = useRef<Mesh>(null);
  const center = new Vector3(0, RADIUS / 2, 0);
  const scale = 0.2 + Math.random() * 0.5;
  const modelIndex = Math.floor(Math.random() * 3);
  const snowflakes = Object.values(SNOW_FLAKE);

  const position = new Vector3(
    center.x - RADIUS + Math.random() * RADIUS * 2,
    center.y + RADIUS + Math.random() * RADIUS * 2,
    center.z - RADIUS + Math.random() * RADIUS * 2
  );

  const snow = useGLTF(snowflakes[modelIndex]).scene.clone();

  snow.position.set(position.x, position.y, position.z);
  snow.scale.set(scale, scale, scale);
  snow.rotation.y = Math.random();
  snow.traverse((obj) => {
    if (obj instanceof Mesh) {
      obj.material = makeColorChangedMaterial(
        obj,
        snowcolor[Math.floor(Math.random() * 3)]
      );
    }
  });

  useFrame((_, delta) => {
    const snow = snowRef.current;
    const speed = 1 * delta;
    if (snow) {
      fallingAnimate(snow, speed, center, RADIUS);
      rotateAnimate(snow, speed);
      visibleInRange(snow, center, RADIUS - 1);
    }
  });

  return <primitive object={snow} ref={snowRef} />;
};

export default Snowflake;
