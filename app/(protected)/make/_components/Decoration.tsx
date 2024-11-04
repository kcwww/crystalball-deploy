'use client';

import { useEffect, useState } from 'react';

import { Suspense } from 'react';
import { DrawerClose } from '@/components/ui/drawer';
import { DecorationType } from '@/shared/types/model';
import { Canvas } from '@react-three/fiber';
import Deco from '@/app/(protected)/make/_components/Deco';
import { use3DModel } from '../store/modelStore';
import { DECO_TYPE } from '@/shared/constants/3dModel';

const Decoration = ({ path, type }: { path: string; type: DecorationType }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { setModel, setBottom } = use3DModel();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleModel = () => {
    if (type === DECO_TYPE.MAIN) {
      setModel({ model: path });
    } else if (type === DECO_TYPE.BOTTOM) {
      setBottom({ bottom: path });
    }
  };

  return (
    <DrawerClose
      onClick={() => handleModel()}
      style={{ width: '18rem', height: '18rem' }}
    >
      <Canvas style={{ width: '100%', height: '100%' }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} color={'#ffffff'} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1.5}
            color={'#ffffff'}
          />
          <Deco path={path} type={type} />
        </Suspense>
      </Canvas>
    </DrawerClose>
  );
};

export default Decoration;
