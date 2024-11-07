'use client';

import { useEffect, useState } from 'react';

import { Suspense } from 'react';
import { DrawerClose } from '@/components/ui/drawer';
import { Canvas } from '@react-three/fiber';

import InitializeDecoration from '@/app/(public)/visit/_components/InitializeDecoration';
import { use3DModel } from '@/app/(public)/visit/[userId]/store/modelStore';

const Decoration = ({ path }: { path: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { setModel } = use3DModel();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleModel = () => {
    setModel({ model: path });
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
          <InitializeDecoration path={path} />
        </Suspense>
      </Canvas>
    </DrawerClose>
  );
};

export default Decoration;
