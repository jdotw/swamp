import React from "react";
import { Outlet } from "react-router-dom";

function OrgShell() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default OrgShell;
