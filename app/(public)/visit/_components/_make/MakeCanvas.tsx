'use client';

import { Suspense, useEffect, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MessageDecoration from '@/app/(public)/visit/_components/_make/MessageDecoration';
import { STEP } from '@/app/(public)/visit/[userId]/_constants/step';
import Loading from '@/shared/components/canvas/Loading';

const MakeCanvas = ({ step }: { step: number }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="canvas-3d">
      <Canvas
        flat
        linear
        shadows={true}
        camera={{ position: [5, 0, 0], fov: 100 }}
      >
        <Suspense fallback={<Loading />}>
          {step < STEP.MESSAGE_NOTE_COLOR && (
            <OrbitControls
              target={[0, 0, 0]}
              enablePan={false}
              enableZoom={false}
            />
          )}
          <ambientLight intensity={1.5} color={'#ffffff'} />

          <directionalLight
            position={[10, 20, 10]}
            intensity={1.5}
            color={'#ffffff'}
          />
          <MessageDecoration />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default MakeCanvas;
