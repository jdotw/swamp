import { useState } from "react";
import { useParams } from "react-router-dom";
import { createStyles, Table, ScrollArea, Button, Title } from "@mantine/core";
import Loading from "../../../Components/Loading/Loading";
import { useSquad } from "../../../Client/Squad";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

interface SquadHomeProps {}

function SquadHome(props: SquadHomeProps) {
  const { tribeId, squadId: id } = useParams();
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

  // const rows = roles.map((row: SquadRole) => {
  //   const id = row.id.toString();
  //   return (
  //     <tr key={id}>
  //       <td>
  //         <Link to={`${id}`}>{row.individual.first_name}</Link>
  //       </td>
  //       <td>
  //         <Link to={`${id}`}>{row.individual.last_name}</Link>
  //       </td>
  //       <td>
  //         <Link to={`${id}`}>{row.squad_role_type.name}</Link>
  //       </td>
  //     </tr>
  //   );
  // });

  // const submitAddRole = async (newRole: NewSquadRole) => {
  //   await addRole(newRole);
  //   setAddModalOpen(false);
  // };

  return (
    <>
      <div>
        <Title order={3}>Squad: {squad.name}</Title>
        <Title order={4}>Members</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
              </tr>
            </thead>
            {/* <tbody>{rows}</tbody> */}
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Person</Button>
        </div>
      </div>
      {/* <AddRoleModal
        tribeId={tribeId}
        squadId={id}
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitAddRole}
      /> */}
    </>
  );
}

export default SquadHome;
