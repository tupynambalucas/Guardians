import {  useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei'; // Import from drei
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GameCamera = () => {
  const cameraRef = useRef(undefined);
  const { setDefaultCamera } = useThree();

  useEffect(() => {
    // Make this camera the default camera for the scene
    if (cameraRef.current) {
      setDefaultCamera(cameraRef.current);
    }
  }, [setDefaultCamera]);

  // You can use useFrame for manual updates if needed
  useFrame(() => cameraRef.current?.updateMatrixWorld());

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault // Automatically sets it as the default
      fov={75}
      position={[0, 0, 10]}
      near={0.1}
      far={1000}
    />
  );
};

export default GameCamera