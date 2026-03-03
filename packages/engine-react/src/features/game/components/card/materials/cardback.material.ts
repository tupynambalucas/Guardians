import { MeshPhysicalNodeMaterial } from 'three/webgpu';
import { texture } from 'three/tsl';
import * as THREE from 'three';

// This factory function creates a configurable TSL material for the card back.
// It accepts a THREE.Texture object, making it reusable for any card artwork.
export function createCardBackMaterial(artworkTexture: THREE.Texture) {
  // As per the persona's instructions, we must set the color space for color maps.
  artworkTexture.colorSpace = THREE.SRGBColorSpace;

  // Center the texture as requested.
  artworkTexture.center = new THREE.Vector2(0.5, 0.5);
  // artworkTexture.rotation = Math.PI; // Corrects orientation if the model's UV is flipped.
  artworkTexture.flipY = false; // Ensure flipY is disabled to respect the model's UV mapping.

  const cardBackMaterial = new MeshPhysicalNodeMaterial({
    name: 'M_Card_Back',
    roughness: 1.0,
    metalness: 0.2,
    clearcoat: 0.0,
  });
  cardBackMaterial.emissive = new THREE.Color(0x000000);

  // The core of the TSL graph: sample the provided texture.
  cardBackMaterial.colorNode = texture(artworkTexture);

  return cardBackMaterial;
}
