import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createStyles, Table, ScrollArea, Button, Title } from "@mantine/core";
import Loading from "../../../Components/Loading/Loading";
import { useSquad } from "../../../Client/Squad";
import { MutateRoleModal } from "./MutateRoleModal";
import { useRole } from "../../../Client/Role";

const useStyles = createStyles((theme) => ({
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

interface SquadHomeProps {}

function SquadHome(props: SquadHomeProps) {
  const tribeId = +useParams().tribeId!;
  const id = +useParams().squadId!;
  const { items: roles, createItem: createRole } = useRole({
    tribeId,
    squadId: id,
  });
  const { classes, theme } = useStyles();
  const { items, loading } = useSquad({
    tribeId,
    id,
  });
  const [addModalOpen, setAddModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const squad = items && items.length > 0 ? items[0] : undefined;

  if (!id || !tribeId || !squad) {
    return <div>Squad not found</div>;
  }

  const submitNewRole = async (newRole: any) => {
    await createRole(newRole);
    setAddModalOpen(false);
  };

  const roleElements = roles.map((role) => (
    <tr
      key={role.id.toString()}
      className={
        role.active_role_assignment ? classes.filledRole : classes.vacantRole
      }
    >
      <td>
        <Link to={`/org/roles/${role.id}`}>{role.role_type!.title}</Link>
      </td>
      <td>
        {role.active_role_assignment ? (
          <Link to={`/org/persons/${role.active_role_assignment.person!.id}`}>
            {role.active_role_assignment.person!.first_name}{" "}
            {role.active_role_assignment.person!.last_name}
          </Link>
        ) : (
          "vacant"
        )}
      </td>
      <td>TODO</td>
    </tr>
  ));

  return (
    <>
      <div>
        <Title order={3}>Squad: {squad.name}</Title>
        <br />
        <Title order={4}>Roles</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>Title</th>
                <th>Person</th>
                <th>Capability Unit</th>
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
        unit_id={id}
        unit_type={"squad"}
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitNewRole}
      />
    </>
  );
}

export default SquadHome;
