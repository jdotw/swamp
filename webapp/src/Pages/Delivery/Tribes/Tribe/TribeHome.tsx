import React, { useState } from "react";

import {
  createStyles,
  Table,
  ScrollArea,
  Button,
  Container,
  Title,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../../Components/Loading/Loading";
import { useTribe } from "../../../../Client/Tribe";
import { MutateSquadModal } from "./MutateSquadModal";
import { MutateSquad, useSquad } from "../../../../Client/Squad";
import { AddTribeRoleModal } from "./AddTribeRoleModal";

const useStyles = createStyles((theme) => ({
  headline: {
    fontSize: 24,
    padding: 10,
    margin: 0,
  },
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

interface TribeHomeProps {}

export function TribeHome(props: TribeHomeProps) {
  const id = +useParams().tribeId!;
  const { classes } = useStyles();
  const { items, loading } = useTribe({
    id: id,
  });
  const {
    items: squadItems,
    loading: loadingSquadItems,
    createItem: createSquadItem,
  } = useSquad({ tribeId: id });
  const [addSquadModalOpen, setMutateSquadModalOpen] = useState(false);
  const [addRoleModalOpen, setAddRoleModalOpen] = useState(false);

  if (loading || loadingSquadItems) {
    return <Loading />;
  }

  const tribe = items.length > 0 ? items[0] : undefined;
  if (!id || !tribe) {
    return <div>Tribe not found</div>;
  }

  const squadRows = squadItems.map((row) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`squads/${id}`}>{row.name}</Link>
        </td>
      </tr>
    );
  });

  const submitNewSquad = async (newSquad: MutateSquad) => {
    await createSquadItem(newSquad);
    setMutateSquadModalOpen(false);
  };

  return (
    <>
      <div>
        <Title order={3}>Tribe: {tribe.name}</Title>
        <br />
        <Title order={4}>Squads</Title>
        <ScrollArea>
          <Table verticalSpacing="xs" data-testid="squads-table">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>{squadRows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setMutateSquadModalOpen(true)}>
            Add Squad
          </Button>
        </div>
        <br />
        <Title order={4}>Tribe Roles</Title>
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
                  <Link to={"/org/roles/3"}>Head of Product</Link>
                </td>
                <td>
                  <Link to={"/org/people/3"}>John Thurman</Link>
                </td>
              </tr>
              <tr className={classes.vacantRole}>
                <td>Chief Engineer</td>
                <td>vacant</td>
              </tr>
              <tr>
                <td>Tribe Leader</td>
                <td>Samuel Goleman</td>
              </tr>
            </tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddRoleModalOpen(true)}>Add Role</Button>
        </div>
      </div>
      <MutateSquadModal
        opened={addSquadModalOpen}
        onClose={() => setMutateSquadModalOpen(false)}
        onSubmit={submitNewSquad}
      />
      {/* <AddTribeRoleModal
        opened={addRoleModalOpen}
        onClose={() => setAddRoleModalOpen(false)}
        onSubmit={() => setAddRoleModalOpen(false)}
      /> */}
    </>
  );
}

export default TribeHome;
