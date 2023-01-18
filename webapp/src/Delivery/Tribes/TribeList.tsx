import React, { useState } from "react";

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
import { AddTribeModal } from "./AddTribeModal";
import { MutateTribe, Tribe, useTribe } from "../../Client/Tribe";

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
  const { items, loading, createItem } = useTribe({});
  const [addTribeModalOpen, setAddTribeModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const rows = items.map((row: Tribe) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`${id}`}>{row.name}</Link>
        </td>
      </tr>
    );
  });

  const submit = async (newTribe: MutateTribe) => {
    await createItem(newTribe);
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
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddTribeModalOpen(true)}>Add Tribe</Button>
        </div>
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
