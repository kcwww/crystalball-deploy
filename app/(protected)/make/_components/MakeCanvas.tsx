'use client';

import { useEffect, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MainDecoration from '@/app/(protected)/make/_components/MainDecoration';
import Bottom from '@/app/(protected)/make/_components/Bottom';
import Base from '@/app/(protected)/make/_components/Base';
import { STEP } from '@/app/(protected)/make/_constants/step';

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
        camera={{ position: [12, 2, 0], fov: 100 }}
      >
        <OrbitControls
          target={[0, 0, 0]}
          enablePan={false}
          maxZoom={1}
          minDistance={12}
          maxDistance={18}
          maxPolarAngle={(Math.PI / 2) * 1.2}
        />
        <ambientLight intensity={1.5} color={'#ffffff'} />

        <directionalLight
          position={[1, 2, 1]}
          intensity={1.5}
          color={'#ffffff'}
        />
        <directionalLight
          position={[1, 0, 0]}
          intensity={0.7}
          color={'#ffffff'}
        />
        {step >= STEP.MAIN_DECORATION && <MainDecoration step={step} />}
        {step >= STEP.BOTTOM_DECORATION && (
          <>
            <Base />
            <Bottom />
          </>
        )}
      </Canvas>
    </section>
  );
};

export default MakeCanvas;
