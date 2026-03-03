# Material: Protective Sleeve

This TSL material simulates the clear, plastic protective sleeve that a valuable card might be kept in.

It's a `MeshPhysicalNodeMaterial` configured for high transparency and reflectivity, with physical properties like `ior` (Index of Refraction) set to create a realistic, high-quality plastic/glass effect suitable for WebGPU rendering.

## TSL Code

Create a file at `packages/engine-react/src/features/canvas/components/Card/materials/protective-sleeve.material.ts`

```typescript
import { MeshPhysicalNodeMaterial } from 'three/tsl';

// 1. Define the Material with physical properties for a clear sleeve
export const ProtectiveSleeveMaterial = new MeshPhysicalNodeMaterial({
  // Core Properties
  transmission: 1.0,  // Fully transparent
  roughness: 0.05,    // Very smooth, but not perfect like glass
  metalness: 0.0,     // Non-metallic

  // Physical Accuracy
  ior: 1.45,          // Index of Refraction for plastic is slightly less than glass
  thickness: 0.5,     // Represents the thin volume of the sleeve

  // Aesthetics
  clearcoat: 0.5,         // A subtle secondary reflective layer
  clearcoatRoughness: 0.05, // Smooth clearcoat
});
```
