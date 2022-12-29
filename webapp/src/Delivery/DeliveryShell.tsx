import { Title } from "@mantine/core";
import { Outlet } from "react-router";

function DeliveryShell() {
  return (
    <div>
      <Title>Delivery</Title>
      <Outlet />
    </div>
  );
}

export default DeliveryShell;
