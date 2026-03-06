# 🛡️ Guardians of Humanity - Gamified Learning Platform

Welcome to the **Guardians of Humanity** project. This is an interactive, gamified learning platform demonstrating a high-fidelity 3D experience using **WebGPU**, **React 19**, and **Three Shading Language (TSL)**. The goal is to create an engaging "Game-Lesson" for the "Agent Training" course.

## 📚 Overview

This project is a **Monorepo** engineered to separate business logic from the visual layer.

### Workspaces

| Package | Path | Responsibility |
| :--- | :--- | :--- |
| **`@guardians/engine-core`** | [`packages/engine-core`](packages/engine-core) | **Logic & State**. State machines, strict types, i18n. Framework agnostic. |
| **`@guardians/engine-react`** | [`packages/engine-react`](packages/engine-react) | **Presentation**. React 19, R3F v9, WebGPU Renderer, TSL Shaders for digital cards. |
| **`@guardians/engine-assets`** | [`packages/engine-assets`](packages/engine-assets) | **Assets**. GLB models for cards and scenes, textures, and blend files. |

## 🛠️ Installation

**Prerequisites:** Node.js v20+ (Required for Workspaces and Vite).

```bash
# 1. Install dependencies (Root)
npm install
```

## 💻 Main Commands

Run these commands from the **project root**:

### Development
```bash
# Start the Frontend (Vite) with HMR
npm run frontend:dev
Note: This starts the development server for engine-react, which internally uses tsconfig-paths to alias @guardians/engine-core to local source files for hot-reloading.
```

### Quality Control
```bash
# Run ESLint (Strict Type-Checking)
npm run lint

# Run Type Checking (TypeScript)
npm run type-check
```

### Production Build & Preview
```bash
# Build all packages in order (Core -> React)
npm run build

# Preview the production build locally
npm run frontend:preview
```

## 📖 Documentation Reference

- **[Product Brief](PRODUCT.md)**: The vision and goals for the product.
- **[Project Context](.gemini/CONTEXT.md)**: The "North Star" for the AI agent.
- **[Architecture](ARCHITECTURE.md)**: Detailed system design and data flow.
- **[Style Guide](.gemini/STYLEGUIDE.md)**: Strict coding conventions and ESLint rules.

## ⚡ Tech Stack

- **Renderer:** [Three.js WebGPURenderer](https://threejs.org/)
- **Shaders:** [Three Shading Language (TSL)](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language)
- **Framework:** [React 19](https://react.dev/) & [React Three Fiber v9](https://docs.pmnd.rs/react-three-fiber)
- **State:** [XState](https://xstate.js.org/) (Logic) & [Zustand](https://github.com/pmndrs/zustand) (UI)
- **Styling:** [TailwindCSS v4](https://tailwindcss.com/)

---
_Designed for performance. Built with Gemini._