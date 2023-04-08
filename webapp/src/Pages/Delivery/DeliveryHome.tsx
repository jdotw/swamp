

import { Button, createStyles, ScrollArea, Table, Title, Text } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MutateRoleType,
  RoleType,
  useRoleType,
} from "../../Client/RoleType";
import Loading from "../../Components/Loading/Loading";
import { MutateDeliveryModal } from "./MutateDeliveryModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

function DeliveryHome() {
  const { classes } = useStyles();
  return (
    <>
      <div>
        <Title order={2}>Delivery</Title>
      </div>
    </>
  );
}

export default DeliveryHome;
