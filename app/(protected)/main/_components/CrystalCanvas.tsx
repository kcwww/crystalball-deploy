'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

import MainDecoration from '@/app/(protected)/main/_components/MainDecoration';
import Bottom from '@/app/(protected)/main/_components/Bottom';
import Decorations from '@/app/(protected)/main/_components/Decorations';
import Raycaster from '@/app/(protected)/main/_components/Raycaster';

import Base from '@/shared/components/3dModels/Base';
import Glass from '@/shared/components/3dModels/Glass';
import Snowflake from '@/shared/components/3dModels/Snowflake';
import Ground from '@/shared/components/3dModels/Ground';
import Environments from '@/shared/components/3dModels/Environment';
import Loading from '@/shared/components/canvas/Loading';
import CustomTooltip from '@/shared/components/ui/CustomTooltip';
import { Crystal } from '@/shared/types/crystal';
import { MAIN_ONBOARDING_STEPS } from '@/shared/constants/onBoading';

const JoyRide = dynamic(() => import('react-joyride'), { ssr: false });

const CrystalCanvas = ({
  data,
  current,
}: {
  data: Crystal[];
  current: number;
}) => {
  const [run, setRun] = useState(false);
  const [isLoading, setLoadingDone] = useState(false);

  const loadingDone = () => {
    setLoadingDone(true);
  };

  useEffect(() => {
    const mainOnboarding = localStorage.getItem('mainOnboarding');
    if (mainOnboarding !== 'completed' && isLoading) {
      setRun(true);
    }
  }, [isLoading]);

  const handleJoyrideCallback = (data: { status: string; action: string }) => {
    const { status, action } = data;

    // Joyride 상태 확인: 'finished' 또는 'skipped'일 때 로컬 스토리지 저장
    if (status === 'finished' || action === 'skip') {
      localStorage.setItem('mainOnboarding', 'completed');
      setRun(false); // 투어 중단
    }
  };

  return (
    <>
      <section className="canvas-3d">
        <Canvas
          className="main-onboarding-crystal-canvas"
          flat
          linear
          shadows={true}
          camera={{ position: [16, 0, 0], fov: 100 }}
        >
          <Suspense fallback={<Loading loadingDone={loadingDone} />}>
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
            <Environments />
            <Ground />
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
      <JoyRide
        tooltipComponent={CustomTooltip}
        steps={MAIN_ONBOARDING_STEPS}
        run={run}
        disableOverlay={false}
        disableCloseOnEsc={true}
        disableOverlayClose={true}
        hideCloseButton={true}
        continuous={true}
        showSkipButton={true}
        spotlightClicks={false}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 1000,
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      />
    </>
  );
};

export default CrystalCanvas;
