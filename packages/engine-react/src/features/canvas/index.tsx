import * as THREE from 'three/webgpu';
import { Canvas, extend, type CanvasProps } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Model as CardModel } from './components/card/model/card.model';
import nightsky from '@guardians/engine-assets/exr/nightsky.exr';

extend(THREE as unknown as Record<string, new (...args: unknown[]) => unknown>);

function SceneCanvas() {
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
    <Canvas gl={glConfig} shadows camera={{ position: [0, 0, 15], fov: 25 }}>
      <Environment
        files={nightsky as string}
        background={true}
        preset={undefined}
        backgroundBlurriness={0} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
        backgroundIntensity={0.8} // optional intensity factor (default: 1, only works with three 0.163 and up)
        backgroundRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
        environmentIntensity={0.5}
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 15]} intensity={1.5} castShadow shadow-bias={-0.0001} />

      <OrbitControls
        enableDamping={true}
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={30}
        maxPolarAngle={Math.PI / 1}
      />

      <CardModel scale={50} />
    </Canvas>
  );
}

export default SceneCanvas;
