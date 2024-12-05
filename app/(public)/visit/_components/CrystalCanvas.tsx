'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

import MainDecoration from '@/app/(public)/visit/_components/MainDecoration';
import Bottom from '@/app/(public)/visit/_components/Bottom';
import Decorations from '@/app/(public)/visit/_components/Decorations';

import Base from '@/shared/components/3dModels/Base';
import Glass from '@/shared/components/3dModels/Glass';
import Snowflake from '@/shared/components/3dModels/Snowflake';
import Ground from '@/shared/components/3dModels/Ground';
import Environments from '@/shared/components/3dModels/Environment';
import Raycaster from '@/shared/components/canvas/Raycaster';
import { UserData } from '@/shared/types/userData';
import Loading from '@/shared/components/canvas/Loading';
import { Suspense } from 'react';

const CrystalCanvas = ({
  userData,
  current,
}: {
  userData: UserData;
  current: number;
}) => {
  return (
    <section className="canvas-3d">
      <Canvas
        flat
        linear
        shadows={true}
        camera={{ position: [16, 0, 0], fov: 100 }}
      >
        <Suspense fallback={<Loading />}>
          <OrbitControls
            target={[0, 0, 0]}
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={(Math.PI / 2 / 9) * 8}
          />
          <ambientLight intensity={1.5} color={'#ffffff'} />

          <directionalLight
            position={[30, 30, 10]} // x축을 더 멀리, y축을 더 높게, z축은 중앙으로
            intensity={1} // 강도를 약간 높임
            color={'#ffffff'}
            castShadow={true}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={1000} // 더 멀리까지 보이도록
            shadow-camera-near={1}
            shadow-camera-left={-40}
            shadow-camera-right={40}
            shadow-camera-top={40}
            shadow-camera-bottom={-40}
          />

          <Raycaster />
          <Glass />
          {Array.from({ length: 100 }, (_, i) => (
            <Snowflake key={i} />
          ))}
          <Decorations messages={userData.crystals[current].messages} />
          <MainDecoration crystal={userData.crystals[current]} />
          <Base />
          <Bottom crystal={userData.crystals[current]} />
          <Ground />
          <Environments />
          <EffectComposer>
            <Bloom
              mipmapBlur={true}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
              intensity={0.2}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </section>
  );
};

export default CrystalCanvas;
