import { useState, useCallback } from 'react';
import { Group, Mesh, Object3DEventMap, Vector3 } from 'three';

import { useGLTF } from '@react-three/drei';

import { makeColorChangedMaterial } from '@/shared/components/3dModels/utils/model';
import { DECO, ETC } from '@/shared/constants/3dModel';

interface DecoProps {
  id: number;
  scale: number;
  position: Vector3;
  message: string;
  color: string;
  sender: string;
  letterID: string;
  isOpened: boolean;
  messageID: string;
  sendAt: string;
}

const DecoSet = (deco: Group<Object3DEventMap>) => {
  const newModel = useGLTF(ETC.NEW).scene.clone().children[0];
  newModel.position.set(0, 1.2, 0);
  newModel.scale.set(0.1, 0.1, 0.1);
  deco.add(newModel);
};

const Decoration = ({
  scale,
  position,
  message,
  id,
  color,
  sender,
  letterID,
  isOpened,
  messageID,
  sendAt,
}: DecoProps) => {
  const [open, setOpen] = useState(isOpened);
  const decorations = Object.values(DECO);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const deco = useGLTF(decorations[id - 1].fileName).scene.clone();
  const target = { x: 8, z: 0 };
  const focus = Math.atan2(position.z - target.z, position.x - target.x);

  deco.name = decorations[id].name;
  deco.scale.set(scale, scale, scale);
  deco.position.set(position.x, position.y, position.z);
  if (!open) {
    DecoSet(deco);
  }

  deco.children.forEach((child) => {
    if (child instanceof Mesh) {
      child.userData.message = message;
      child.userData.sender = sender;
      child.userData.letterColor = letterID;
      child.userData.messageID = messageID;
      child.userData.sendAt = sendAt;
      child.userData.isOpened = open;
      child.userData.handleOpen = handleOpen;
      child.castShadow = false;
      if (child.name === 'Main') {
        child.material = makeColorChangedMaterial(child, color);
      }
    }
  });
  deco.rotateY(Math.PI - focus);

  return <primitive object={deco} />;
};

export default Decoration;