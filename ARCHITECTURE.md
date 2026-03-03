# 🏗️ Architecture Overview

This document describes the high-level architecture of the **Guardians of Humanity** project. We utilize a **Monorepo** strategy to strictly separate business logic from the high-fidelity presentation layer, leveraging **WebGPU** and **TSL**.

## 📦 Monorepo Structure

```mermaid
graph TD
    User[User Interaction] --> View[@guardians/engine-react]
    View --> Core[@guardians/engine-core]
    View --> Assets[@guardians/engine-assets]

    subgraph "Presentation Layer (WebGPU)"
        View
        R3F[React Three Fiber v9]
        TSL[Three Shading Language]
    end

    subgraph "Logic Layer (Pure TS)"
        Core
        XState[State Machines]
        Constants[Game Config]
    end

    subgraph "Resource Layer"
        Assets
        Models[GLB Card Models]
        Textures[Card Textures]
    end
```

### 1. `@guardians/engine-core` (The Brain)
**Role:** The single source of truth for the application state and game rules.
- **Framework Agnostic:** Zero dependencies on React or Three.js (except math types).
- **State Management:** XState machines define the possible states of the application (e.g., `ViewingDecks`, `ActivatingCard`, `InChallenge`).
- **Internationalization:** Contains all text and translation logic.

### 2. `@guardians/engine-react` (The View)
**Role:** The visual runtime. It translates state into pixels, rendering the 3D cards and UI.
- **Tech Stack:** React 19, R3F v9, WebGPURenderer, TailwindCSS v4.
- **Architecture Pattern: The Card Actor**
  - We manage a collection of `CardActor` components within the canvas.
  - Each actor listens to state changes from `engine-core` and transitions properties (rotation, material states, visibility) smoothly.
- **TSL Implementation:** All card shaders are written in TypeScript using TSL nodes, enabling runtime compilation for WebGPU.

### 3. `@guardians/engine-assets` (The Resources)
**Role:** Passive storage for heavy assets.
- **Workflow:**
  1.  **Blender:** Used for modeling the 3D cards and defining "Placeholders" (e.g., a mesh named `Card_Front_Face`).
  2.  **Export:** GLB (Draco Compressed).
  3.  **Runtime:** `engine-react` loads the GLB, finds `Card_Front_Face`, and replaces its material with a high-fidelity TSL material.

## 🔄 Data Flow

1.  **Input:** User clicks a card or a UI button in `engine-react`.
2.  **Dispatch:** An action is sent to the `engine-core` State Machine (e.g., `Events.ACTIVATE_CARD`).
3.  **Transition:** The Machine updates its context (e.g., `context.activeCard = 'GuardianAnton'`).
4.  **Reaction:**
    - The UI displays the card's description and challenge.
    - The 3D Scene detects the change.
    - The corresponding `CardActor` triggers a GSAP animation to bring it to the front and reveal its details.

## 🛠️ Build & Tooling

- **Workspace Manager:** NPM Workspaces.
- **Linting:** ESLint v9 Flat Config (Strict).
- **Bundling:**
  - `engine-core`: `tsc` (Outputs ESM).
  - `engine-react`: `vite` (WebGPU optimized build).
