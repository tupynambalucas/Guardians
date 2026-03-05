import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three/webgpu';
import { Canvas, extend, type CanvasProps } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Card from './components/card';
import GameCamera from './components/camera';

extend(THREE as unknown as Record<string, new (...args: unknown[]) => unknown>);

function Game() {
  const [rendererMode, setRendererMode] = useState<'pending' | 'webgpu' | 'webgl'>('pending');
  const hasTested = useRef(false);

  useEffect(() => {
    if (hasTested.current) return;
    hasTested.current = true;

    async function testGPU() {
      if (!navigator.gpu) {
        setRendererMode('webgl');
        return;
      }

      try {
        // 1. Pedimos acesso direto à GPU (sem o Three.js no meio) para um diagnóstico cirúrgico
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) throw new Error('Adaptador WebGPU indisponível');

        const device = await adapter.requestDevice();

        // 2. Criamos um "espião" para capturar o exato momento em que o Vulkan crasha
        let isDeviceLost = false;
        void device.lost.then(() => {
          isDeviceLost = true;
        });

        // 3. Forçamos a criação do buffer de vídeo no DOM (onde o Android falha)
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.opacity = '0';
        document.body.appendChild(canvas);

        const context = canvas.getContext('webgpu');
        if (context) {
          context.configure({
            device,
            format: navigator.gpu.getPreferredCanvasFormat(),
            alphaMode: 'premultiplied', // O canal Alpha que está a causar o erro no seu sistema
          });

          // 4. Obrigado a desenhar 1 frame vazio para acionar o hardware imediatamente
          const encoder = device.createCommandEncoder();
          const pass = encoder.beginRenderPass({
            colorAttachments: [
              {
                view: context.getCurrentTexture().createView(),
                clearValue: { r: 0, g: 0, b: 0, a: 0 },
                loadOp: 'clear',
                storeOp: 'store',
              },
            ],
          });
          pass.end();
          device.queue.submit([encoder.finish()]);
        }

        // 5. Aguardamos 150ms. Se o driver do telemóvel for crashar, ele fará isso agora.
        await new Promise((resolve) => setTimeout(resolve, 150));

        canvas.remove();

        // Verificamos o nosso espião antes de destruir o dispositivo
        if (isDeviceLost) {
          throw new Error('WebGPU Device Lost (Falha no Driver Vulkan)');
        }

        device.destroy();
        console.log('✅ WebGPU estável. Hardware buffer suportado!');
        setRendererMode('webgpu');
      } catch (error) {
        console.warn('⚠️ WebGPU instável no dispositivo. Ativando fallback para WebGL2...', error);
        setRendererMode('webgl');
      }
    }

    void testGPU();
  }, []);

  if (rendererMode === 'pending') {
    return null;
  }

  const glConfig: CanvasProps['gl'] = async ({ canvas }) => {
    const renderer = new THREE.WebGPURenderer({
      canvas: canvas as unknown as HTMLCanvasElement,
      antialias: true,
      alpha: true,
      forceWebGL: rendererMode === 'webgl',
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
