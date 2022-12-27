import React, { useState } from "react";

import {
  createStyles,
  Table,
  ScrollArea,
  Button,
  Container,
} from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useTribes } from "../Client/Tribes";
import { NewTribe, Tribe } from "../Client/Tribe";
import { AddTribeModal } from "./TribeAddModal";

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
  const [addModelOpen, setAddModelOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const rows = tribes.map((row: Tribe) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={id}>{row.name}</Link>
        </td>
        <td>
          <Link to={id}>{row.lead_full_name}</Link>
        </td>
      </tr>
    );
  });

  const submit = async (newTribe: NewTribe) => {
    await add(newTribe);
    setAddModelOpen(false);
  };

  return (
    <>
      <div>
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
          <Button onClick={() => setAddModelOpen(true)}>Add Tribe</Button>
        </div>
      </div>
      <AddTribeModal
        opened={addModelOpen}
        onClose={() => setAddModelOpen(false)}
        onSubmit={submit}
      />
    </>
  );
}

export default TribeList;
