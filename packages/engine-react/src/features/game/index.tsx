import * as THREE from 'three/webgpu';
import { Canvas, extend, type CanvasProps } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Card from './components/card';
import GameCamera from './components/camera';
// import nightsky from '@guardians/engine-assets/exr/nightsky.exr';

extend(THREE as unknown as Record<string, new (...args: unknown[]) => unknown>);

function Game() {
  const glConfig: CanvasProps['gl'] = async ({ canvas }) => {
    const renderer = new THREE.WebGPURenderer({
      canvas: canvas as unknown as HTMLCanvasElement,
      antialias: true,
      alpha: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 0.5;
    renderer.setPixelRatio(window.devicePixelRatio);
    await renderer.init();
    return renderer as unknown as THREE.Renderer;
  };

  return (
    <Canvas gl={glConfig} shadows>
      <GameCamera />

      <Environment
        // files={nightsky}
        preset="studio"
        background={false}
        backgroundIntensity={0.8} // optional intensity factor (default: 1, only works with three 0.163 and up)
        environmentIntensity={0.3}
      />
      <hemisphereLight
        color="#ffffff"
        groundColor="#aaaaaa"
        intensity={0.2}
        position={[0, 100, 30]}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 15]} intensity={1.5} castShadow shadow-bias={-0.0001} />

      {/* <OrbitControls
        enableDamping={true}
        dampingFactor={0.5}
        minDistance={5}
        maxDistance={30}
        maxPolarAngle={Math.PI / 1}
      /> */}

      <Card scale={50.0} />
    </Canvas>
  );
}

export default Game;
