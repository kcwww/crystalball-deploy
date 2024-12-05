'use client';

import { useLayoutEffect, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scroll, ScrollControls } from '@react-three/drei';
import { Suspense } from 'react';
import { use3DModel } from '@/app/(protected)/make/store/modelStore';
import InitializeDecoration from '@/app/(protected)/make/_components/InitializeDecoration';
import { DECO_TYPE } from '@/shared/constants/3dModel';
import { DecorationType } from '@/shared/types/model';
import Loading from '@/shared/components/canvas/Loading';

const DecorationsViewer = ({
  onClose,
  decorations,
  type,
}: {
  onClose: () => void;
  decorations: Array<{ path: string }>;
  type: DecorationType;
}) => {
  const { setModel, setBottom } = use3DModel();
  const [pages, setPages] = useState(1);

  const ITEM_WIDTH = 200;
  const ITEM_GAP = type === DECO_TYPE.MAIN ? 100 : 150;

  const handleModel = useCallback(
    (path: string) => {
      if (type === DECO_TYPE.MAIN) {
        setModel({ model: path });
      } else if (type === DECO_TYPE.BOTTOM) {
        setBottom({ bottom: path });
      }
      onClose();
    },
    [onClose, setBottom, setModel, type]
  );

  useLayoutEffect(() => {
    const handleScrollSize = () => {
      const screenWidth = window.innerWidth;
      const minWidth =
        decorations.length * ITEM_WIDTH + ITEM_GAP + screenWidth / 2;
      const newPages = Math.ceil(minWidth / screenWidth);
      setPages(newPages);
    };

    handleScrollSize();
    window.addEventListener('resize', handleScrollSize);

    return () => {
      window.removeEventListener('resize', handleScrollSize);
    };
  }, [decorations]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <Suspense fallback={<Loading />}>
          <ambientLight intensity={1} color={'#ffffff'} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={0.7}
            color={'#ffffff'}
          />
          <ScrollControls horizontal damping={0.3} pages={pages}>
            <Scroll>
              {/* 장식들을 렌더링 */}
              {decorations.map((deco, index) => (
                <group
                  key={index}
                  onClick={() => handleModel(deco.path)}
                  position={[
                    index * (type === DECO_TYPE.MAIN ? 4.5 : 6.5),
                    0,
                    0,
                  ]} // 장식 간격 조정
                >
                  <InitializeDecoration path={deco.path} type={type} />
                </group>
              ))}
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default DecorationsViewer;
