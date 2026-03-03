import { PRODUCT_COLORS } from '@iphone17pro-lp/engine-core';
import { MeshPhysicalNodeMaterial } from 'three/webgpu';
import { color, float, mx_noise_float, add, mul, bumpMap, sample, vec3 } from 'three/tsl';

export const AluminumMaterial = new MeshPhysicalNodeMaterial({
  name: 'M_Aluminium',
  metalness: 1.0,
  roughness: 0.45,
  clearcoat: 0.0,
});

const grainScale = float(2500);
const grainNoise = sample((uv) => {
  return vec3(mx_noise_float(uv.mul(grainScale), 0.2, 0.3));
});

AluminumMaterial.colorNode = color(PRODUCT_COLORS.pink);

AluminumMaterial.roughnessNode = add(0.3, mul(grainNoise, 0.1));

const bumpIntensity = float(1.0);
const bumpMapNode = bumpMap(grainNoise, bumpIntensity);
AluminumMaterial.normalNode = bumpMapNode;
