import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createStyles, Table, ScrollArea, Button, Title } from "@mantine/core";
import Loading from "../../../Components/Loading/Loading";
import { useSquad } from "../../../Client/Squad";
import { AddSquadRoleModal } from "./AddSquadRoleModal";

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
            <tbody>
              <tr>
                <td>
                  <Link to={"/org/roles/3"}>Senior Software Engineer</Link>
                </td>
                <td>John Thurman</td>
                <td>Front-End Engineering</td>
              </tr>
              <tr className={classes.vacantRole}>
                <td>Software Engineer</td>
                <td>vacant</td>
                <td>Front-End Engineering</td>
              </tr>
              <tr>
                <td>Software Engineer</td>
                <td>Samuel Goleman</td>
                <td>Back-End Engineering</td>
              </tr>
              <tr>
                <td>Quality Engineer</td>
                <td>Harish Thakkar</td>
                <td>Quality Engineering</td>
              </tr>
              <tr>
                <td>Engineering Manager</td>
                <td>Wen Yoew</td>
                <td>Back-End Engineering</td>
              </tr>
              <tr>
                <td>UI Designer</td>
                <td>Emily Blanchet</td>
                <td>Product Design</td>
              </tr>
              <tr className={classes.vacantRole}>
                <td>Infrastructure Engineer</td>
                <td>vacant</td>
                <td>Cloud</td>
              </tr>
            </tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Role</Button>
        </div>
      </div>
      <AddSquadRoleModal
        title="Add Role"
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={() => setAddModalOpen(false)}
      />
    </>
  );
}

export default SquadHome;
