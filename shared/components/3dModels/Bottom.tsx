'use client';

import { Mesh, MeshStandardMaterial, CanvasTexture } from 'three';
import { useGLTF } from '@react-three/drei';

const makeCanvasTexture = ({
  width,
  height,
  bgColor,
  fontColor,
  font,
  string,
  positionY,
}: {
  width: number;
  height: number;
  bgColor: string;
  fontColor: string;
  font: string;
  string: string;
  positionY: number;
}) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw 'context is not exist!!!';
  }

  [canvas.width, canvas.height] = [width, height];

  context.fillStyle = bgColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = fontColor;
  context.font = font;
  context.textBaseline = 'middle';

  const textWidth = context.measureText(string).width;
  context.fillText(
    string,
    canvas.width / 2 - textWidth / 2,
    positionY,
    canvas.width
  );

  return new CanvasTexture(canvas);
};

const Bottom = () => {
  const bottom = useGLTF('/assets/bottoms/bottom1.glb').scene.clone();

  const nameTag = bottom.getObjectByName('nameTag') as Mesh | undefined;

  if (nameTag && nameTag.material instanceof MeshStandardMaterial) {
    const newTexture = makeCanvasTexture({
      string: 'title',
      width: 1024,
      height: 1024,
      positionY: 1024 / 8,
      font: 'Bold 6.25rem KingSejongInstitute, sans-serit',
      fontColor: 'black',
      bgColor: 'white',
    });
    nameTag.material.map = newTexture;
    nameTag.material.bumpMap = newTexture;
  }

  bottom.scale.set(1, 1, 1);
  bottom.position.set(0, 0, 0);
  bottom.receiveShadow = true;
  bottom.castShadow = true;
  return <primitive object={bottom} />;
};

export default Bottom;
