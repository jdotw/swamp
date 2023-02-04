import { Button, createStyles, ScrollArea, Table, Title } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Role, useRole } from "../../../Client/Role";
import {
  MutateRoleType,
  RoleType,
  useRoleType,
} from "../../../Client/RoleType";
import Loading from "../../../Components/Loading/Loading";

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

  const roleTitle = (role: Role) => {
    if (
      (role.delivery_unit_assignment &&
        !role.delivery_unit_assignment.function_type
          .is_individual_contributor) ||
      (role.capability_unit_assignment &&
        !role.capability_unit_assignment.function_type
          .is_individual_contributor)
    ) {
      return role.active_level_assignment.level.manager_title;
    } else {
      return role.active_level_assignment.level.individual_contributor_title;
    }
  };

  const roleElements = items.map((role) => (
    <tr key={role.id.toString()}>
      <td>
        <Link to={role.id.toString()}>{role.role_type!.title}</Link>
      </td>
      <td>
        <Link to={role.id.toString()}>{roleTitle(role)}</Link>
      </td>
      <td>
        {role.delivery_unit_assignment ? (
          <Link to={role.id.toString()}>
            {role.delivery_unit_assignment.unit.name}
          </Link>
        ) : (
          "Not Assigned"
        )}
      </td>
      <td>
        {role.capability_unit_assignment ? (
          <Link to={role.id.toString()}>
            {role.capability_unit_assignment.unit.name}
          </Link>
        ) : (
          "Not Assigned"
        )}
      </td>
      <td>
        {role.assigned_person ? (
          <Link to={role.id.toString()}>
            {role.assigned_person.first_name} {role.assigned_person.last_name}
          </Link>
        ) : (
          "Vacant"
        )}
      </td>
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
            <th>Type</th>
            <th>Level</th>
            <th>Delivery Unit</th>
            <th>Capability</th>
            <th>Person</th>
            <th>Tenure</th>
          </tr>
        </thead>
        <tbody>{roleElements}</tbody>
      </Table>
    </div>
  );
}

export default RolesList;
