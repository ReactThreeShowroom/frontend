import React from "react";
import { useLoaderData } from "react-router";

const ClientViewModel = () => {
  const model = useLoaderData();
  console.log(model);
  return <></>;
};

export default ClientViewModel;
