---
name: tsl-material-generator
description: Creates high-fidelity, physically-based TSL (Three Shading Language) materials for React Three Fiber, based on the desired visual properties for the Digital Collectible Cards in the Guardians of Humanity project.
---

# TSL Card Material Generator

This skill provides expert-level, physically-based TSL (Three Shading Language) materials for the **Guardians of Humanity** project. The materials are designed for the WebGPU pipeline and follow the strict architectural and performance standards of this project, enabling effects like holographic foils, gemstone inlays, and protective sleeves.

## Workflow

The process is straightforward:

1.  **Select a Base Material**: Choose from Holographic Foil, Protective Sleeve, or Gemstone.
2.  **Get the Code**: Navigate to the corresponding reference file to get the TSL code for the `NodeMaterial`.
3.  **Apply Color/Texture**: If you are using a material that requires a base color or texture (like the card art), consult the `colors.md` reference or apply your texture node.
4.  **Integrate**: Assign the TSL material to the appropriate mesh in your React Three Fiber scene.

---

## 1. Select a Base Material & Get the Code

Each material is defined in its own reference file. They are pre-configured to match the desired physical properties for the digital cards.

- **For holographic card effects:** See `references/holographic-foil.md`
- **For a clear, protective look:** See `references/protective-sleeve.md`
- **For gem-like inlays on cards:** See `references/gemstone.md`

These files contain ready-to-use `MeshPhysicalNodeMaterial` instances.

## 2. Apply Color & Textures

The cards will have unique art and color schemes. The `references/colors.md` file contains TSL `color` nodes for a base palette.

After creating your base material, you can set its color or texture using the nodes from that file or by creating a new `texture` node.

**Example:**

```typescript
import { HolographicMaterial } from './materials/holographic.material';
import { GuardianAntonColor } from './materials/colors.material';

// Set the colorNode of the material
HolographicMaterial.colorNode = GuardianAntonColor;
```

## 3. Integration into the Scene

Follow the project's "Blender to Web" pipeline:

1.  **Load your GLB model**: Use `useGLTF` from `@react-three/drei`.
2.  **Traverse the scene graph**: Find the meshes by the names you assigned in Blender (e.g., `Card_Body`, `Gem_Inlay`).
3.  **Assign the material**: Set the `.material` property of the mesh to the TSL material instance you've imported.

```tsx
import { useGLTF } from '@react-three/drei';
import { ProtectiveSleeveMaterial } from './materials/protective-sleeve.material';

export function CardModel() {
  const { nodes } = useGLTF('path/to/card.glb');

  // Assuming you have a mesh named 'Card_Sleeve' in your Blender file
  const sleeveMesh = nodes.Card_Sleeve as THREE.Mesh;

  if (sleeveMesh) {
    sleeveMesh.material = ProtectiveSleeveMaterial;
  }

  return <primitive object={nodes.Scene} />;
}
```
