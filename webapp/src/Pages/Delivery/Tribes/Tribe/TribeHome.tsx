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
        <Title order={4}>Tribe Roles</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
              </tr>
            </thead>
            {/* <tbody>{roleRows}</tbody> */}
          </Table>
        </ScrollArea>
      </div>
      <MutateSquadModal
        opened={addSquadModalOpen}
        onClose={() => setMutateSquadModalOpen(false)}
        onSubmit={submitNewSquad}
      />
    </>
  );
}

export default TribeHome;
