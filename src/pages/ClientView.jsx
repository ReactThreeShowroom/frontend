import { Canvas } from "@react-three/fiber";
import React from "react";
import { Outlet, useOutletContext } from "react-router";
import { ClientViewModel } from "../components";

const ClientView = () => {
  const outletState = useOutletContext();
  return (
    <div className="h-full w-full">
      <Outlet />
      <Canvas>
        <color args={["#2fbb00"]} attach="background" />
        <ClientViewModel />
      </Canvas>
    </div>
  );
};

export default ClientView;
