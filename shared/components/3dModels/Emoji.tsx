import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh, Vector3 } from 'three';

import { Sentiment, SENTIMENT } from '@/shared/constants/3dModel';
import {
  rotateAnimate,
  visibleInRange,
} from '@/shared/components/3dModels/utils/model';

interface SnowProps {
  centerPosition: Vector3;
  rangeRadius: number;
  sentiment: Sentiment;
  confidence: number;
}

const randomizePosition = (
  target: Mesh | Group,
  centerPosition: Vector3,
  radius: number
) => {
  const x =
    centerPosition.x +
    (radius / 2) * Math.cos(Math.random() * 2 * Math.PI) -
    0.5;
  const z =
    centerPosition.z +
    (radius / 2) * Math.sin(Math.random() * 2 * Math.PI) -
    0.5;
  const height = centerPosition.y + radius + Math.random() * radius * 2;
  target.position.set(x, height, z);
};

const fallingAnimate = (
  target: Mesh,
  speed: number,
  centerPosition: Vector3,
  radius: number
) => {
  if (target.position.y <= -1) {
    randomizePosition(target, centerPosition, radius);
  }
  target.position.y -= speed;
};

const Emoji = ({
  centerPosition,
  rangeRadius,
  sentiment,
  confidence,
}: SnowProps) => {
  const snowRef = useRef<Mesh>(null);
  const flake = useGLTF(SENTIMENT[sentiment]).scene.clone();
  const scale = 0.3 + confidence / 200; // min 0.3 max 0.8

  randomizePosition(flake, centerPosition, rangeRadius);

  flake.scale.set(scale, scale, scale);
  flake.rotation.y = Math.random();

  useFrame((_, delta) => {
    const snow = snowRef.current;
    const speed = 1 * delta;
    if (snow) {
      fallingAnimate(snow, speed, centerPosition, rangeRadius);
      rotateAnimate(snow, speed);
      visibleInRange(snow, centerPosition, rangeRadius - 1);
    }
  });

  return <primitive object={flake} ref={snowRef} />;
};

export default Emoji;
