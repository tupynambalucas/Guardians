# Material: Holographic Foil

This TSL material simulates a shimmering, holographic foil effect for rare collectible cards. It uses a high metalness value and procedural, time-based noise on the color and roughness maps to create a dynamic, high-performance look.

This follows the "Proceduralism First" principle, avoiding the need for complex video textures.

## TSL Code

Create a file at `packages/engine-react/src/features/canvas/components/Card/materials/holographic-foil.material.ts`

```typescript
import {
  MeshPhysicalNodeMaterial,
  color,
  float,
  uv,
  vec2,
  vec3,
  mix,
  mx_noise_vec3,
  sin,
  timerLocal
} from 'three/tsl';

// 1. Define the Material with base physical properties
export const HolographicFoilMaterial = new MeshPhysicalNodeMaterial({
  metalness: 1.0,
  roughness: 0.1,
  transparent: true,
});

// 2. Define the Procedural Logic (The Graph)
// We use time and noise to simulate a shifting holographic effect.
const time = timerLocal();
const scaledUV = uv().mul(vec2(5.0, 10.0));
const holoNoise = mx_noise_vec3(vec3(scaledUV.x.add(time.mul(0.1)), scaledUV.y, time.mul(0.5)));

// 3. Assign Nodes to Material Properties
// The base color can be set from a color palette. Here we define the holographic effect.
const baseColor = color('#a0f0ff');
const accentColor = color('#f0a0ff');
HolographicFoilMaterial.colorNode = mix(baseColor, accentColor, holoNoise.x);

// Add a subtle opacity variation
HolographicFoilMaterial.opacityNode = mix(float(0.8), float(1.0), sin(time.mul(2.0)).add(1.0).div(2.0));

// Modulate roughness for a more complex shimmer
const minRoughness = float(0.05);
const maxRoughness = float(0.2);
HolographicFoilMaterial.roughnessNode = mix(minRoughness, maxRoughness, holoNoise.y);
```
