import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  createStyles,
  Table,
  ScrollArea,
  Button,
  Container,
  Title,
} from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { Individual } from "../../Client/Individual";
import { useSquad } from "../../Client/Squad";

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
  const { loading, members } = useSquad({
    tribeId,
    id,
  });
  const [addModalOpen, setAddModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const rows = members.map((row: Individual) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`${id}`}>{row.first_name}</Link>
        </td>
        <td>
          <Link to={`${id}`}>{row.last_name}</Link>
        </td>
      </tr>
    );
  });

  // const submit = async (newTribe: NewTribe) => {
  //   await add(newTribe);
  //   setAddModalOpen(false);
  // };

  return (
    <>
      <div>
        <Title order={3}>Squad</Title>
        <Title order={4}>Members</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Person</Button>
        </div>
      </div>
      {/* <AddIndividualModal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submit}
      /> */}
    </>
  );
}

export default SquadHome;
