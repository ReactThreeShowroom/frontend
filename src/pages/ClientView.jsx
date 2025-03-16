import { Canvas } from "@react-three/fiber";
import React from "react";
import { Outlet, useOutletContext } from "react-router";
import { ClientViewModel } from "../components";
import * as THREE from "three";

const ClientView = () => {
  // const outletState = useOutletContext();
  return (
    <div className="h-full w-full">
      {/* <Outlet /> */}
      <Canvas gl={{ toneMapping: THREE.NoToneMapping}}>
        <ClientViewModel />
      </Canvas>
    </div>
  );
};

export default ClientView;
