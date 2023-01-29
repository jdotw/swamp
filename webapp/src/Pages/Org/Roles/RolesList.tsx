import { Button, createStyles, ScrollArea, Table, Title } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRole } from "../../../Client/Role";
import {
  MutateRoleType,
  RoleType,
  useRoleType,
} from "../../../Client/RoleType";
import Loading from "../../../Components/Loading/Loading";
import { MutateRoleTypeModal } from "./MutateRoleTypeModal";

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

  console.log("ITEMS: ", items);

  if (loading) return <Loading />;

  const roleElements = items.map((role) => (
    <tr key={role.id.toString()}>
      <td>
        <Link to={role.id.toString()}>{role.role_type!.title}</Link>
      </td>
      <td>
        <Link to={role.id.toString()}>
          {role.unit_assignments![0].squad.name}
        </Link>
      </td>
      <td>TODO</td>
      <td>TODO</td>
    </tr>
  ));

  return (
    <div>
      <Title order={3}>Roles</Title>
      <br />
      <Title order={4}>All Roles</Title>
      <Table>
        <thead>
          <tr>
            <th>Role Type</th>
            <th>Delivery Unit</th>
            <th>Capability</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>{roleElements}</tbody>
      </Table>
    </div>
  );
}

export default RolesList;
