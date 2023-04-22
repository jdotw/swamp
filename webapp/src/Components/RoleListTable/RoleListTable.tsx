import { Button, createStyles, ScrollArea, Table } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MutateRole, Role, useRole } from "../../Client/Role";
import { MutateRoleModal } from "./MutateRoleModal";
import Loading from "../Loading/Loading";

const useStyles = createStyles(() => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  vacantRole: {
    backgroundColor: "#ff000040",
  },
  filledRole: {},
}));

export interface RoleListTableProps {}

export const RoleListTablePropsDefaults = {
  showCapability: false,
};

const RoleListTable = ({}: RoleListTableProps) => {
  const { classes } = useStyles();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { loading, items: roles, createItem: createRole } = useRole({});

  const submitNewRole = async (newRole: MutateRole) => {
    await createRole(newRole);
    setAddModalOpen(false);
  };

  const roleTitle = (role: Role) => {
    if (
      role.active_level_assignment.level.manager_title &&
      role.active_level_assignment.level.individual_contributor_title
    ) {
      return `${role.active_level_assignment.level.manager_title} / ${role.active_level_assignment.level.individual_contributor_title}`;
    } else if (role.active_level_assignment.level.manager_title) {
      return role.active_level_assignment.level.manager_title;
    } else if (
      role.active_level_assignment.level.individual_contributor_title
    ) {
      return role.active_level_assignment.level.individual_contributor_title;
    } else {
      return "No Title";
    }
  };

  const roleUrlPrefix = "/org/roles";

  const roleElements = roles.map((role) => (
    <tr key={role.id.toString()}>
      <td>
        <Link to={`${roleUrlPrefix}/${role.id.toString()}`}>
          {role.role_type!.name}
        </Link>
      </td>
      <td>
        <Link to={`${roleUrlPrefix}/${role.id.toString()}`}>
          {roleTitle(role)}
        </Link>
      </td>
      <td>Not Assigned</td>
      <td>Not Assigned</td>
      <td>
        {role.active_role_assignment?.person ? (
          <Link to={`${roleUrlPrefix}/${role.id.toString()}`}>
            {role.active_role_assignment.person.first_name}{" "}
            {role.active_role_assignment.person.last_name}
          </Link>
        ) : (
          "Vacant"
        )}
      </td>
      <td>TODO</td>
    </tr>
  ));

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>Type</th>
                <th>Level</th>
                <th>Delivery</th>
                <th>Capability</th>
                <th>Person</th>
                <th>Tenure</th>
              </tr>
            </thead>
            <tbody>{roleElements}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Role</Button>
        </div>
      </div>
      <MutateRoleModal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitNewRole}
      />
    </>
  );
};

export default RoleListTable;
