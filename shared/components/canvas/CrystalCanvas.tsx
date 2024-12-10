'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { OrbitControls } from '@react-three/drei';

import MainDecoration from '@/shared/components/3dModels/MainDecoration';
import Bottom from '@/shared/components/3dModels/Bottom';
import Decorations from '@/shared/components/canvas/Decorations';
import Environments from '@/shared/components/3dModels/Environment';

import Base from '@/shared/components/3dModels/Base';
import Glass from '@/shared/components/3dModels/Glass';
import Snowflake from '@/shared/components/3dModels/Snowflake';
import Ground from '@/shared/components/3dModels/Ground';
import CustomTooltip from '@/shared/components/ui/CustomTooltip';
import Raycaster from '@/shared/components/canvas/Raycaster';
import { LANDING_ONBOARDING_STEPS } from '@/shared/constants/onBoading';

const JoyRide = dynamic(() => import('react-joyride'), { ssr: false });

const CrystalCanvas = () => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const landingOnboarding = localStorage.getItem('landingOnboarding');
    if (landingOnboarding !== 'completed') {
      setRun(true);
    }
  }, []);

  const handleJoyrideCallback = (data: { status: string; action: string }) => {
    const { status, action } = data;

    // Joyride 상태 확인: 'finished' 또는 'skipped'일 때 로컬 스토리지 저장
    if (status === 'finished' || action === 'skip') {
      localStorage.setItem('landingOnboarding', 'completed');
      setRun(false); // 투어 중단
    }
  };

  return (
    <>
      <section className="canvas-3d">
        <Canvas
          className="onboarding-crystal-canvas"
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
          <Decorations />
          <MainDecoration />
          <Base />
          <Bottom />
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
        </Canvas>
      </section>
      <JoyRide
        tooltipComponent={CustomTooltip}
        steps={LANDING_ONBOARDING_STEPS}
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
