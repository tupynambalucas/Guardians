import React, { useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { Canvas, extend, type CanvasProps } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Card from './components/card';
import GameCamera from './components/camera';

extend(THREE as unknown as Record<string, new (...args: unknown[]) => unknown>);

function Game() {
  // Estado que controla a inicialização. 'pending' significa que estamos testando o celular.
  const [rendererMode, setRendererMode] = useState<'pending' | 'webgpu' | 'webgl'>('pending');

  useEffect(() => {
    async function testGPU() {
      try {
        // 1. Criamos um canvas temporário na memória apenas para testar o driver
        const testCanvas = document.createElement('canvas');
        const testRenderer = new THREE.WebGPURenderer({
          canvas: testCanvas,
          antialias: true,
          alpha: true,
        });

        // 2. O erro do driver Vulkan do seu celular vai acontecer AQUI, de forma segura
        await testRenderer.init();

        // 3. Se não deu erro, a GPU suporta WebGPU perfeitamente. Limpamos a memória.
        testRenderer.dispose();
        console.log('✅ Teste WebGPU passou. Iniciando com WebGPU...');
        setRendererMode('webgpu');
      } catch (error) {
        // 4. O driver falhou! Capturamos o erro e decidimos usar o WebGL.
        console.warn('⚠️ Teste WebGPU falhou. Forçando fallback para WebGL...', error);
        setRendererMode('webgl');
      }
    }

    void testGPU();
  }, []);

  // Enquanto o teste acontece (é muito rápido), não renderizamos o Canvas para evitar crashes
  if (rendererMode === 'pending') {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          color: 'white',
          backgroundColor: '#111',
        }}
      >
        Carregando Motor Gráfico...
      </div>
    );
  }

  // Agora a função glConfig é segura e não vai lançar erros fatais
  const glConfig: CanvasProps['gl'] = async ({ canvas }) => {
    const renderer = new THREE.WebGPURenderer({
      canvas: canvas as unknown as HTMLCanvasElement,
      antialias: true,
      alpha: true,
      forceWebGL: rendererMode === 'webgl', // Usa o resultado do nosso teste
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
        preset="studio"
        background={false}
        backgroundIntensity={0.8}
        environmentIntensity={0.3}
      />

      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 20, 20]} intensity={10} castShadow shadow-bias={-0.0001} />

      <Card scale={50.0} />
    </Canvas>
  );
}

export default Game;
