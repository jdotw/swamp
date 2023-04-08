import { Button, createStyles, ScrollArea, Table, Title, Text } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Role, useRole } from "../../../Client/Role";
import {
  MutateRoleType,
  RoleType,
  useRoleType,
} from "../../../Client/RoleType";
import Loading from "../../../Components/Loading/Loading";
import RoleListTable from "../../../Components/RoleListTable/RoleListTable";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

function RolesList() {
  const { classes } = useStyles();
  const { items, loading, createItem } = useRole();
  const [addModalOpen, setAddModalOpen] = useState(false);

  if (loading) return <Loading />;

  return (
    <div>
      <Title order={3}>Roles</Title>
      <Text>This is the list of Roles, or positions, that people can be assigned to.</Text>
      <RoleListTable />
    </div>
  );
}

export default RolesList;
