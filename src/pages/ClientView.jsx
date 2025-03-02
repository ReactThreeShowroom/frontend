import { Canvas } from "@react-three/fiber";
import React from "react";
import { Outlet, useOutletContext } from "react-router";
import { ClientViewModel } from "../components";

const ClientView = () => {
  const outletState = useOutletContext();
  return (
    <div>
      <Outlet />
      <Canvas>
        <ClientViewModel />
      </Canvas>
    </div>
  );
};

export default ClientView;
