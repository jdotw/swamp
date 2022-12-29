import React, { useState } from "react";

import {
  createStyles,
  Table,
  ScrollArea,
  Button,
  Container,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { useTribes } from "../../Client/Tribes";
import { NewTribe, Tribe } from "../../Client/Tribe";
import { AddTribeModal } from "./AddTribeModal";
import TribeRoleTypeList from "../TribeRoleTypes/TribeRoleTypeList";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

interface TribeListProps {}

export function TribeList(props: TribeListProps) {
  const { classes, theme } = useStyles();
  const { tribes, loading, add, addError, adding } = useTribes();
  const [addTribeModalOpen, setAddTribeModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const rows = tribes.map((row: Tribe) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`tribes/${id}`}>{row.name}</Link>
        </td>
        <td>
          <Link to={`tribes/${id}`}>{row.lead_full_name}</Link>
        </td>
      </tr>
    );
  });

  const submit = async (newTribe: NewTribe) => {
    await add(newTribe);
    setAddTribeModalOpen(false);
  };

  return (
    <>
      <div>
        <Title order={3}>Tribes</Title>
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
          <Button onClick={() => setAddTribeModalOpen(true)}>Add Tribe</Button>
        </div>
      </div>
      <div>
        <TribeRoleTypeList />
      </div>
      <AddTribeModal
        opened={addTribeModalOpen}
        onClose={() => setAddTribeModalOpen(false)}
        onSubmit={submit}
      />
    </>
  );
}

export default TribeList;
