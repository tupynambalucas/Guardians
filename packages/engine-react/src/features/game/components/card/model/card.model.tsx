import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';
import modelPath from '@guardians/engine-assets/models/Card.glb';
import { createCardBackMaterial } from '../materials/cardback.material';
import artworkPath from '@guardians/engine-assets/textures/cards/back/jamar.png';

type GLTFResult = GLTF & {
  nodes: {
    MSH_CardBack_Inner_Border: THREE.Mesh;
    MSH_CardBack_Outter_Border: THREE.Mesh;
    MSH_CardBack_Surface: THREE.Mesh;
    MSH_CardFront_Inner_Border: THREE.Mesh;
    MSH_CardFront_Outter_Border: THREE.Mesh;
    MSH_CardFront_Surface: THREE.Mesh;
    MSH_Card_Body: THREE.Mesh;
  };
  materials: {
    M_Card_Border: THREE.MeshStandardMaterial;
    M_Card_Back: THREE.MeshStandardMaterial;
    M_Card_Front: THREE.MeshStandardMaterial;
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
          <group name="GRP_CardBack">
            <group name="GRP_CardBack_Borders">
              <mesh
                name="MSH_CardBack_Inner_Border"
                castShadow
                receiveShadow
                geometry={nodes.MSH_CardBack_Inner_Border.geometry}
                material={materials.M_Card_Border}
              />
              <mesh
                name="MSH_CardBack_Outter_Border"
                castShadow
                receiveShadow
                geometry={nodes.MSH_CardBack_Outter_Border.geometry}
                material={materials.M_Card_Border}
              />
            </group>
            <mesh
              name="MSH_CardBack_Surface"
              castShadow
              receiveShadow
              geometry={nodes.MSH_CardBack_Surface.geometry}
              material={cardBackMaterial}
            />
          </group>
          <group name="GRP_CardFront">
            <group name="GRP_CardFront_Borders">
              <mesh
                name="MSH_CardFront_Inner_Border"
                castShadow
                receiveShadow
                geometry={nodes.MSH_CardFront_Inner_Border.geometry}
                material={materials.M_Card_Border}
              />
              <mesh
                name="MSH_CardFront_Outter_Border"
                castShadow
                receiveShadow
                geometry={nodes.MSH_CardFront_Outter_Border.geometry}
                material={materials.M_Card_Border}
              />
            </group>
            <mesh
              name="MSH_CardFront_Surface"
              castShadow
              receiveShadow
              geometry={nodes.MSH_CardFront_Surface.geometry}
              material={materials.M_Card_Front}
            />
          </group>
          <mesh
            name="MSH_Card_Body"
            castShadow
            receiveShadow
            geometry={nodes.MSH_Card_Body.geometry}
            material={materials.M_Paper}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(modelPath);
useTexture.preload(artworkPath);
