import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';

import { Material, MeshBasicMaterial, MeshStandardMaterial } from 'three';

const makeColorChangedMaterial = (mesh: Mesh, color: string) => {
  const newMaterial = (mesh.material as Material).clone() as Material;

  if (
    newMaterial instanceof MeshBasicMaterial ||
    newMaterial instanceof MeshStandardMaterial
  ) {
    newMaterial.color.set(color);
  }

  return newMaterial;
};

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

const rotateAnimate = (target: Mesh, speed: number) => {
  target.rotation.y += speed;
};

const visibleInRange = (
  target: Mesh,
  centerPosition: Vector3,
  radius: number
) => {
  target.visible =
    target.position.distanceTo(centerPosition) > radius ? false : true;
};

const snowcolor = ['#99c9fd', '#a5bbd3', '#f1faff'];

const Snowflake = () => {
  const snowRef = useRef<Mesh>(null);
  const rangeRadius = 7;
  const center = new Vector3(0, rangeRadius / 2, 0);
  const radius = 0.2 + Math.random() * 0.5;
  const modelIndex = Math.floor(Math.random() * 3);

  const position = new Vector3(
    center.x - rangeRadius + Math.random() * rangeRadius * 2,
    center.y + rangeRadius + Math.random() * rangeRadius * 2,
    center.z - rangeRadius + Math.random() * rangeRadius * 2
  );

  const snow = useGLTF(
    `/assets/flakes/snowFlake0${modelIndex + 1}.glb`
  ).scene.clone();

  snow.position.set(position.x, position.y, position.z);
  snow.scale.set(radius, radius, radius);
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
      fallingAnimate(snow, speed, center, rangeRadius);
      rotateAnimate(snow, speed);
      visibleInRange(snow, center, rangeRadius - 1);
    }
  });

  return <primitive object={snow} ref={snowRef} />;
};

export default Snowflake;
