import { useRef, useEffect } from 'react';
import { Vector3 } from 'three';
import { useThree, useFrame } from '@react-three/fiber';

import usePrev from '@/shared/hooks/usePrev';

const Raycaster = () => {
  const { camera, pointer, raycaster, scene, gl } = useThree();
  const { view, isZoom, onIn, onZoom, onZoomOut } = usePrev();

  const isClickedRef = useRef(false); // 유리 클릭한 시점 , 뒤로가기 버튼 누른 시점 === true // 카메라 업 다운 차이 기록
  const isAnimating = useRef(false); // 유리 클릭한 시점 , 뒤로가기 버튼 누른 시점 === true // 카메라 업 다운 차이 기록
  const lastPosition = useRef<number>(0);

  useFrame((_, delta) => {
    const isClicked = isClickedRef.current;
    const zoomOutSpeed = 1 + delta * 2;

    if (isAnimating.current) {
      if (isClicked && !isZoom) {
        onIn();
        const targetPosition = new Vector3(0, -1, 0);
        camera.position.distanceTo(targetPosition) > 6
          ? camera.position.lerp(targetPosition, delta * 2)
          : (isAnimating.current = false);
      } else {
        isAnimating.current = false;
      }
    } else {
      if (view) {
        onZoom(isZoom);
      } else if (isZoom && !view) {
        if (camera.position.distanceTo(new Vector3(0, 1, 0)) < 15) {
          camera.position.x *= zoomOutSpeed;
          camera.position.y *= zoomOutSpeed;
          camera.position.z *= zoomOutSpeed;
          // camera.position.lerp(new Vector3(0, 1, 0), delta * 2);
        } else {
          onZoomOut();
        }
      }
    }
  });

  useEffect(() => {
    const onClickHandler = () => {
      // 포인터 위치를 기준으로 레이캐스터 설정
      raycaster.setFromCamera(pointer, camera);

      //터치한 시간으로 이벤트 분기
      if (window.performance.now() - lastPosition.current > 120) return;

      // 씬의 모든 객체들과 교차점 계산
      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length < 1) return;
      console.log(intersects);
      if (intersects[0].object.name === 'glass') {
        isAnimating.current = true;
        isClickedRef.current = true;
        return;
      }

      const selectedDeco = intersects.find(
        (intersect) => intersect.object.name === 'decoration'
      );
      if (selectedDeco) {
        console.log(selectedDeco.object.name);
      }
    };

    const saveLastTime = () => {
      lastPosition.current = window.performance.now();
    };

    const canvasElement = gl.domElement;
    canvasElement.addEventListener('mouseup', onClickHandler);
    canvasElement.addEventListener('mousedown', saveLastTime);
  }, []);

  return null;
};

export default Raycaster;