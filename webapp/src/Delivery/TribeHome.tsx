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
import Loading from "../Loading/Loading";
import { useTribe, NewTribe, Tribe, NewSquad } from "../Client/Tribe";
import { AddTribeModal } from "./TribeAddModal";

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
  const { tribeId: id } = useParams();
  const { classes, theme } = useStyles();
  const { tribe, loading, addSquad, addSquadError, addingSquad } = useTribe({
    id: id,
  });
  const [addSquadModalOpen, setAddSquadModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }
  if (!tribe) {
    return <div>Tribe not found</div>;
  }

  const rows = tribe.squads
    ? tribe.squads.map((row) => {
        const id = row.id.toString();
        return (
          <tr key={id}>
            <td>
              <Link to={`squads/${id}`}>{row.name}</Link>
            </td>
            <td>
              <Link to={`squads/${id}`}>{row.lead_full_name}</Link>
            </td>
          </tr>
        );
      })
    : null;

  const submit = async (newSquad: NewSquad) => {
    await addSquad(newSquad);
    setAddSquadModalOpen(false);
  };

  return (
    <>
      <div>
        <Title order={3}>Tribe: {tribe.name}</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>Name</th>
                <th>Lead</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddSquadModalOpen(true)}>Add Squad</Button>
        </div>
      </div>
      <AddTribeModal
        opened={addSquadModalOpen}
        onClose={() => setAddSquadModalOpen(false)}
        onSubmit={submit}
      />
    </>
  );
}

export default TribeHome;
