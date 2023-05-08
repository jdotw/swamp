import { Button, createStyles, ScrollArea, Table } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MutateRole, Role, useRole } from "../../Client/Role";
import { MutateRoleModal } from "./MutateRoleModal";
import Loading from "../Loading/Loading";
import { CloseRoleConfirmModal } from "./CloseRoleConfirmModal";

const useStyles = createStyles(() => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  rowButtonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  vacantRole: {
    backgroundColor: "#ff000040",
  },
  filledRole: {},
}));

export interface RoleListTableProps { }

export const RoleListTablePropsDefaults = {
};

const RoleListTable = ({ }: RoleListTableProps) => {
  const { classes } = useStyles();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { loading, items: roles, createItem: createRole, updateItem: updateRole } = useRole({});
  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>();

  const submitNewRole = async (newRole: MutateRole) => {
    await createRole(newRole);
    setAddModalOpen(false);
  };

  const closeRoleClicked = (role: Role) => {
    setSelectedRole(role);
    setCloseModalOpen(true);
  }

  const closeRoleConfirmed = async (role?: Role) => {
    if (role) {
      const closedRole: MutateRole = {
        closed_at_date: new Date().toISOString(),
      }
      await updateRole(role.id, closedRole);
    }
    setCloseModalOpen(false);
  }

  const closeRoleCancelled = () => {
    setCloseModalOpen(false);
  }

  const roleUrlPrefix = "/org/roles";

  const roleElements = roles.map((role) => (
    <tr key={role.id.toString()}>
      <td>
        <Link to={`${roleUrlPrefix}/${role.id.toString()}`}>
          {role.role_type?.name}
        </Link>
      </td>
      <td>
        <Link to={`${roleUrlPrefix}/${role.id.toString()}`}>
          {role.active_title_assignment.title.name}
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
      <td><div className={classes.rowButtonBar}><Button onClick={() => closeRoleClicked(role)}>Close</Button></div></td>
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
                <th></th>
              </tr>
            </thead>
            <tbody>{roleElements}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)} data-testid="add-team-button">Add Role</Button>
        </div>
      </div >
      <MutateRoleModal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitNewRole}
      />
      <CloseRoleConfirmModal
        role={selectedRole}
        opened={closeModalOpen}
        onConfirm={closeRoleConfirmed}
        onCancel={closeRoleCancelled}
      />
    </>
  );
};

export default RoleListTable;
