import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';
import modelPath from '@guardians/engine-assets/models/Card.glb';
import { createCardBackMaterial } from '../materials/cardback.material';
import artworkPath from '@guardians/engine-assets/textures/cards/back/jamar.png';

type GLTFResult = GLTF & {
  nodes: {
    MSH_Card_Back: THREE.Mesh;
    MSH_Card_Body: THREE.Mesh;
    MSH_Card_Front: THREE.Mesh;
  };
  materials: {
    M_Paper_Detail: THREE.MeshStandardMaterial;
    M_Paper: THREE.MeshPhysicalMaterial;
  };
};

export function Model(props: ThreeElements['group']) {
  const { nodes, materials } = useGLTF(modelPath) as unknown as GLTFResult;

  // Load the texture for the card back.
  const cardBackTexture = useTexture(artworkPath);

  // Create the dynamic TSL material for the card back.
  const cardBackMaterial = createCardBackMaterial(cardBackTexture);

  return (
    <group {...props} dispose={null}>
      <group name="Card">
        <group name="GRP_Guardian_Card">
          <mesh
            name="MSH_Card_Back"
            castShadow
            receiveShadow
            geometry={nodes.MSH_Card_Back.geometry}
            material={cardBackMaterial}
          />
          <mesh
            name="MSH_Card_Body"
            castShadow
            receiveShadow
            geometry={nodes.MSH_Card_Body.geometry}
            material={materials.M_Paper}
          />
          <mesh
            name="MSH_Card_Front"
            castShadow
            receiveShadow
            geometry={nodes.MSH_Card_Front.geometry}
            material={materials.M_Paper_Detail}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(modelPath);
useTexture.preload(artworkPath);
