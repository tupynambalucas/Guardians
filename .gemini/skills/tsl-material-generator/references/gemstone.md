# Material: Gemstone Inlay

This TSL material simulates a gemstone inlay on a special edition card. It is similar to the protective sleeve material but uses a higher `ior` (Index of Refraction) and other properties to capture the unique brilliance and light-bending properties of a precious stone.

## TSL Code

Create a file at `packages/engine-react/src/features/canvas/components/Card/materials/gemstone.material.ts`

```typescript
import { MeshPhysicalNodeMaterial } from 'three/tsl';

// 1. Define the Material with physical properties for a gemstone
export const GemstoneMaterial = new MeshPhysicalNodeMaterial({
  // Core Properties
  transmission: 1.0,  // Fully transparent
  roughness: 0.01,    // Almost perfectly smooth, with slight imperfections
  metalness: 0.0,     // Non-metallic

  // Physical Accuracy for a gem
  ior: 1.7,           // Index of Refraction for a gem-like material
  thickness: 2.0,     // Represents the volume of the crystal

  // Aesthetics for a brilliant, gem-like appearance
  clearcoat: 1.0,
  clearcoatRoughness: 0.0,
  sheen: 0.5,
  specularIntensity: 1.0, // Maximize specular highlights
});
```
