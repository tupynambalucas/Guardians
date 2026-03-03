# ⚛️ @guardians/engine-react

The "View" layer for the Guardians of Humanity platform, powered by **React 19** and **WebGPU**.

## 🌟 Key Features

- **React Three Fiber v9**: Utilizes the latest R3F version with support for async renderer initialization.
- **WebGPURenderer**: The default renderer. We target WebGPU first for high-fidelity card visuals.
- **TSL (Three Shading Language)**: All card materials (foils, holographic effects, etc.) are procedural `NodeMaterial` instances.
- **TailwindCSS v4**: For the HTML UI overlays.

## 🏗️ Architecture: Feature-Sliced

- **`src/features/canvas/`**: The 3D World where cards are displayed and interacted with.
  - **`components/Card/`**: The main actor for a single collectible card.
    - `materials/`: **TSL** definitions (e.g., `holographic.material.ts`).
    - `model/`: The GLTF JSX graph (Geometry only).
    - `hooks/`: Animation controllers (GSAP/Spring).
- **`src/features/ui/`**: The 2D Overlay for instructions, challenges, and narrative.
  - Controls the `engine-core` state machine based on user interaction.

## 🛡️ Typing (R3F v9)

We use `ThreeElements` for strict typing of Three.js elements.
- ❌ `import { GroupProps } from '@react-three/fiber'`
- ✅ `import { ThreeElements } from '@react-three/fiber'` -> `ThreeElements['group']`

## ⚠️ Performance Rules (Strict Linting)

This package uses strict ESLint rules to prevent common 3D performance pitfalls:
1.  **`react-three/no-clone-in-frame-loop`**: Do not allocate objects in `useFrame`.
2.  **`react-three/no-fast-state`**: Do not use `useState` for animation values.

## 🚀 Development

```bash
npm run dev
# Starts Vite server. 
# Aliases '@guardians/engine-core' to the local source for easy debugging.
```
