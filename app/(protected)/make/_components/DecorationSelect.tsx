'use client';

import { useEffect, useState } from 'react';

import { Suspense } from 'react';
import { DrawerClose } from '@/components/ui/drawer';
import { DecorationType } from '@/shared/types/model';
import { Canvas } from '@react-three/fiber';
import InitializeDecoration from '@/app/(protected)/make/_components/InitializeDecoration';

import { use3DModel } from '@/app/(protected)/make/store/modelStore';
import { DECO_TYPE } from '@/shared/constants/3dModel';
import Loading from '@/app/loading';

const DecorationSelect = ({
  path,
  type,
}: {
  path: string;
  type: DecorationType;
}) => {
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
    <Suspense fallback={Loading()}>
        <DrawerClose
            onClick={() => handleModel()}
            style={{ width: '18rem', height: '18rem' }}
          >
        <Canvas style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={1} color={'#ffffff'} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={0.7}
            color={'#ffffff'}
          />
          <InitializeDecoration path={path} type={type} />
        </Canvas>
      </DrawerClose>
    </Suspense>
  );
};

export default DecorationSelect;
