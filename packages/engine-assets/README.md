# 📦 @guardians/engine-assets

The central repository for static assets for the Guardians of Humanity platform.

## 📂 Structure

- **`src/models/`**:
  - `blender/`: Source `.blend` files for the 3D cards.
    - **Strategy**: Use Blender for **Geometry** and **Layout**. Do not spend time creating complex Shader Node materials in Blender that won't export.
    - **Naming**: Name meshes clearly (e.g., `Card_Body`, `Gem_Inlay`). These names are keys used by `engine-react` to attach TSL materials.
  - `gltf/`: Exported `.glb` files.
    - **Optimization**: Must use Draco Compression.
- **`src/textures/`**: High-resolution maps (e.g., for card art, normal maps).
  - **Color Space**: Ensure textures are saved in the correct color space.

## 🚀 Integration

This package is consumed by `engine-react`.
- **Development**: Files are resolved directly from the `src` folder via path aliases.
- **Production**: The package uses standard `package.json` exports. Vite/Rollup resolves the binary files as dependencies, hashes them, and bundles them automatically into the frontend's final `dist/assets` output.

## ⚠️ Large File Storage

Binary files (`.blend`, `.glb`, `.png`) should be tracked with **Git LFS** to avoid bloating the repository history.
