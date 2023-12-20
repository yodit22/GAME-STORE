import React from "react";
import { useContextGlobally } from "./StateProvider";
import Collector from "./Collector";
import { Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isLoggedIn } = useContextGlobally();

  return isLoggedIn ? <Outlet /> : <Collector />;
}

export default ProtectedRoute;
