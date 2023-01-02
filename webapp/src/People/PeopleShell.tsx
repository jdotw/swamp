import React from "react";
import { Outlet } from "react-router";

export function PeopleShell() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
