
import { Button, createStyles, ScrollArea, Table, Title, Text } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

function CapabilityHome() {
  const { classes } = useStyles();
  return (
    <>
      <div>
        <Title order={2}>Capabilities</Title>
      </div>
    </>
  );
}

export default CapabilityHome;
