import { useGLTF } from '@react-three/drei';
import { Group, Mesh, Object3DEventMap, Vector3 } from 'three';
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

export const DECO = [
  { name: '선물상자', fileName: '/assets/models/ribbonBox.glb' },
  {
    name: '선물상자',
    fileName: '/assets/models/ribbonBox.glb',
  },
  {
    name: '붕어빵',
    fileName: '/assets/models/fishBread.glb',
  },
  {
    name: '진저브레드',
    fileName: '/assets/models/gingerBread.glb',
  },
  {
    name: '마크상자',
    fileName: '/assets/models/chest.glb',
  },
  {
    name: '똥',
    fileName: '/assets/models/ddong.glb',
  },
  {
    name: '미니눈사람',
    fileName: '/assets/models/miniSnowMan.glb',
  },
  {
    name: '양말',
    fileName: '/assets/models/socks.glb',
  },
];

export const MSG_COLOR = [
  {
    color: '#860A35',
  },
  {
    color: '#860A35',
  },
  {
    color: '#AF2655',
  },
  {
    color: '#FF0000',
  },
  {
    color: '#EE9322',
  },
  {
    color: '#ffae00',
  },
  {
    color: '#c8cf5c',
  },
  {
    color: '#95af54',
  },
  {
    color: '#1f831f',
  },
  {
    color: '#016A70',
  },
  {
    color: '#22668D',
  },
  {
    color: '#0E21A0',
  },
  {
    color: '#313866',
  },
  {
    color: '#504099',
  },
  {
    color: '#974EC3',
  },
  {
    color: '#9F0D7F',
  },
];

interface DecoProps {
  id: number;
  scale: number;
  position: Vector3;
  message: string;
  color: string;
  sender: string;
  letterID: number;
  isOpened: boolean;
  messageID: number;
}

const DecoSet = (deco: Group<Object3DEventMap>) => {
  const newModel = useGLTF('/assets/etcs/new.glb').scene.clone().children[0];
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
}: DecoProps) => {
  const deco = useGLTF(DECO[id].fileName).scene.clone();
  const target = { x: 8, z: 0 };
  const focus = Math.atan2(position.z - target.z, position.x - target.x);

  deco.name = DECO[id].name;
  deco.scale.set(scale, scale, scale);
  deco.position.set(position.x, position.y, position.z);
  if (!isOpened) {
    DecoSet(deco);
  }

  deco.children.forEach((child) => {
    if (child instanceof Mesh) {
      child.userData.message = message;
      child.userData.sender = sender;
      child.userData.color = color;
      child.userData.letterColor = MSG_COLOR[letterID].color;
      child.userData.messageID = messageID;
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
