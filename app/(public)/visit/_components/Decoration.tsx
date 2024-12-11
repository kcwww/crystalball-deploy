import { Group, Mesh, Object3DEventMap, Vector3 } from 'three';

import { useGLTF } from '@react-three/drei';

import { makeColorChangedMaterial } from '@/shared/components/3dModels/utils/model';
import { DECO, ETC } from '@/shared/constants/3dModel';
import { formattedTime } from '@/shared/utils/time/formattedTime';

interface DecoProps {
  name: string;
  scale: number;
  position: Vector3;
  message: string;
  color: string;
  sender: string;
  letterColor: string;
  isOpened: Date | null;
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
  name,
  color,
  sender,
  letterColor,
  isOpened,
  messageID,
  sendAt,
}: DecoProps) => {
  const decorations = Object.values(DECO);

  const deco = useGLTF(
    decorations.find((deco) => deco.name === name)!.path
  ).scene.clone();
  const target = { x: 8, z: 0 };
  const focus = Math.atan2(position.z - target.z, position.x - target.x);

  deco.name = name;
  deco.scale.set(scale, scale, scale);
  deco.position.set(position.x, position.y, position.z);
  if (!isOpened) {
    DecoSet(deco);
  }

  deco.children.forEach((child) => {
    if (child instanceof Mesh) {
      child.userData.message = message;
      child.userData.sender = sender;
      child.userData.letterColor = letterColor;
      child.userData.messageID = messageID;
      child.userData.sendAt = formattedTime(sendAt);
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
