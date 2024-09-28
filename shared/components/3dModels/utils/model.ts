import { Vector3 } from 'three';
import { Mesh, Material, MeshBasicMaterial, MeshStandardMaterial } from 'three';

export const makeColorChangedMaterial = (mesh: Mesh, color: string) => {
  const newMaterial = (mesh.material as Material).clone() as Material;

  if (
    newMaterial instanceof MeshBasicMaterial ||
    newMaterial instanceof MeshStandardMaterial
  ) {
    newMaterial.color.set(color);
  }

  return newMaterial;
};

export const rotateAnimate = (target: Mesh, speed: number) => {
  target.rotation.y += speed;
};

export const visibleInRange = (
  target: Mesh,
  centerPosition: Vector3,
  radius: number
) => {
  target.visible =
    target.position.distanceTo(centerPosition) > radius ? false : true;
};
