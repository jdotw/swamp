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
  const tribeId = +useParams().tribeId!;
  const id = +useParams().squadId!;
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
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Person</Button>
        </div>
      </div>
    </>
  );
}

export default SquadHome;
