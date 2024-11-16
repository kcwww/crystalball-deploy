'use client';

import { Canvas } from '@react-three/fiber';

import { OrbitControls } from '@react-three/drei';
import MainDecoration from '@/app/(protected)/main/_components/MainDecoration';
import Bottom from '@/app/(protected)/main/_components/Bottom';
import Decorations from '@/app/(protected)/main/_components/Decorations';
import Raycaster from '@/app/(protected)/main/_components/Raycaster';

import Base from '@/shared/components/3dModels/Base';
import Glass from '@/shared/components/3dModels/Glass';
import Snowflake from '@/shared/components/3dModels/Snowflake';
import Ground from '@/shared/components/3dModels/Ground';

import { Crystal } from '@/shared/types/crystal';

const CrystalCanvas = ({
  data,
  current,
}: {
  data: Crystal[];
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
          position={[1, 2, 1]}
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
        <directionalLight
          position={[1, 0, 0]}
          intensity={1}
          color={'#ffffff'}
        />
        <Raycaster />
        <Glass />
        {Array.from({ length: 100 }, (_, i) => (
          <Snowflake key={i} />
        ))}
        <Decorations crystal={data[current]._id} />
        <MainDecoration
          id={data[current].main_decoration_id}
          color={data[current].main_decoration_color}
        />
        <Base />
        <Bottom
          id={data[current].bottom_decoration_id}
          color={data[current].bottom_decoration_color}
          title={data[current].title}
        />
        <Ground />
      </Canvas>
    </section>
  );
};

export default CrystalCanvas;
