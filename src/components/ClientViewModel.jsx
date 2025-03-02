import { Center, OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import { useLoaderData } from "react-router";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

const ClientViewModel = () => {
  const gun = useRef();

  const {
    model: { path },
    pieceFavorite,
  } = useLoaderData();

  const materials = useLoader(MTLLoader, `/models/1-${path}.mtl`);

  const model = useLoader(OBJLoader, `/models/1-${path}.obj`, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  useEffect(() => {
    pieceFavorite.forEach((modelPiece) => {
      const { color, piece } = modelPiece;

      materials.materials[piece.name].color = new THREE.Color(`#${color.hex}`);
    });
  }, []);

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={2.5} />
      <pointLight position={[0, 2.6, 2]} decay={0} intensity={2.2} />
      <Suspense>
        <Center>
          <primitive ref={gun} object={model} scale={2} />
        </Center>
      </Suspense>
    </>
  );
};

export default ClientViewModel;
