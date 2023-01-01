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
import Loading from "../../../Loading/Loading";
import { useTribe, NewSquad, NewTribeRole } from "../../../Client/Tribe";
import { AddSquadModal } from "./AddSquadModal";
import { AddRoleModal } from "./AddRoleModal";

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
  const { classes } = useStyles();
  const { tribe, roles, addRole, loading, addSquad } = useTribe({
    id: id,
  });
  const [addSquadModalOpen, setAddSquadModalOpen] = useState(false);
  const [addRoleModalOpen, setAddRoleModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }
  if (!id || !tribe) {
    return <div>Tribe not found</div>;
  }

  const squadRows = tribe.squads
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

  const roleRows = roles
    ? roles.map((row) => {
        const id = row.id.toString();
        return (
          <tr key={id}>
            <td>
              <Link to={`${id}`}>{row.individual.first_name}</Link>
            </td>
            <td>
              <Link to={`${id}`}>{row.individual.last_name}</Link>
            </td>
            <td>
              <Link to={`${id}`}>{row.tribe_role_type.name}</Link>
            </td>
          </tr>
        );
      })
    : null;

  const submit = async (newSquad: NewSquad) => {
    await addSquad(newSquad);
    setAddSquadModalOpen(false);
  };

  const submitRole = async (newRole: NewTribeRole) => {
    await addRole(newRole);
    setAddRoleModalOpen(false);
  };

  return (
    <>
      <div>
        <Title order={3}>Tribe: {tribe.name}</Title>
        <Title order={4}>Squads</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>Name</th>
                <th>Lead</th>
              </tr>
            </thead>
            <tbody>{squadRows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddSquadModalOpen(true)}>Add Squad</Button>
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
            <tbody>{roleRows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddRoleModalOpen(true)}>Add Role</Button>
        </div>
      </div>
      <AddSquadModal
        opened={addSquadModalOpen}
        onClose={() => setAddSquadModalOpen(false)}
        onSubmit={submit}
      />
      <AddRoleModal
        tribeId={id}
        opened={addRoleModalOpen}
        onClose={() => setAddRoleModalOpen(false)}
        onSubmit={submitRole}
      />
    </>
  );
}

export default TribeHome;
