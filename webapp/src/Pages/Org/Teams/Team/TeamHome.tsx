import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createStyles, Table, ScrollArea, Button, Title } from "@mantine/core";

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

function TeamHome() {
  const id = +useParams().teamId!;

  const { classes, theme } = useStyles();

  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <>
      <div>
        <Title order={3}>Team: Executive Team</Title>
        <br />
        <Title order={4}>Roles</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>Title</th>
                <th>Person</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Link to={"/org/roles/3"}>Managing Director</Link>
                </td>
                <td>Kim Glover</td>
              </tr>
              <tr>
                <td>Chief Technology Officer</td>
                <td>Paul Turner</td>
              </tr>
              <tr>
                <td>Chief Financial Officer</td>
                <td>Jan Twomey</td>
              </tr>
              <tr className={classes.vacantRole}>
                <td>Chief Operating Officer</td>
                <td>vacant</td>
              </tr>
            </tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Role</Button>
        </div>
      </div>
      {/* <AddSquadRoleModal
        title="Add Role"
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={() => setAddModalOpen(false)}
      /> */}
    </>
  );
}

export default TeamHome;
