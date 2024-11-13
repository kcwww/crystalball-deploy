'use client';

import { Canvas } from '@react-three/fiber';

import { OrbitControls } from '@react-three/drei';
import MainDecoration from '@/app/(public)/visit/_components/MainDecoration';
import Bottom from '@/app/(public)/visit/_components/Bottom';
import Decorations from '@/app/(public)/visit/_components/Decorations';

import Base from '@/shared/components/3dModels/Base';
import Glass from '@/shared/components/3dModels/Glass';
import Snowflake from '@/shared/components/3dModels/Snowflake';
import Ground from '@/shared/components/3dModels/Ground';

import Raycaster from '@/shared/components/canvas/Raycaster';
import { UserData } from '@/shared/types/userData';

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
        <OrbitControls
          target={[0, 0, 0]}
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={(Math.PI / 2 / 9) * 8}
        />
        <ambientLight intensity={1.5} color={'#ffffff'} />

        <directionalLight
          position={[10, 20, 10]}
          intensity={1.5}
          color={'#ffffff'}
          castShadow={true}
          shadow-mapSize-width={2048} // shadow resolution
          shadow-mapSize-height={2048}
          shadow-camera-far={50} // default is 50
          shadow-camera-near={1}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
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
      </Canvas>
    </section>
  );
};

export default CrystalCanvas;
