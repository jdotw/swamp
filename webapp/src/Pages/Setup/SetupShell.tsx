import { Title } from "@mantine/core";
import { Outlet } from "react-router";

function SetupShell() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default SetupShell;
