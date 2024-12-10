'use client';

import { Html } from '@react-three/drei';

import { useEffect } from 'react';

import { useProgress } from '@react-three/drei';
import { useState } from 'react';

const Loading = ({ loadingDone }: { loadingDone?: () => void }) => {
  const { progress } = useProgress();
  const progressValue = Math.min(100, Math.round(progress));
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return '.';
        return prev + '.';
      });
    }, 200); // 0.2초마다 점 변경

    return () => {
      clearInterval(interval);
      loadingDone?.();
    };
  }, []);

  return (
    <Html center>
      <div style={{ textAlign: 'center', color: '#fff' }}>
        <div
          style={{
            fontSize: '1.6rem',
            display: 'flex',
            gap: '1rem',
            flexDirection: 'column',
          }}
        >
          <p>Loading{dots}</p>
          <p>{progressValue}%</p>
        </div>
      </div>
    </Html>
  );
};

export default Loading;
