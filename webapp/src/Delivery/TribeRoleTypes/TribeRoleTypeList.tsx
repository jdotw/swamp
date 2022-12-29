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
import { AddTribeModal } from "../Tribes/AddTribeModal";
import {
  NewTribeRoleType,
  TribeRoleType,
  useTribeRoleTypes,
} from "../../Client/TribeRoleTypes";
import { AddTribeRoleTypeModal } from "./AddTribeRoleTypeModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

interface TribeRoleTypeListProps {}

export function TribeRoleTypeList(props: TribeRoleTypeListProps) {
  const { classes, theme } = useStyles();
  const { roleTypes, addTribeRoleType, loading, addError, adding } =
    useTribeRoleTypes();
  const [addTribeModalOpen, setAddTribeModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const rows = roleTypes.map((row: TribeRoleType) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`triberoletypes/${id}`}>{row.name}</Link>
        </td>
      </tr>
    );
  });

  const submit = async (newTribe: NewTribeRoleType) => {
    await addTribeRoleType(newTribe);
    setAddTribeModalOpen(false);
  };

  return (
    <>
      <div>
        <Title order={3}>Tribe Role Types</Title>
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
          <Button onClick={() => setAddTribeModalOpen(true)}>
            Add Role Type
          </Button>
        </div>
      </div>
      <AddTribeRoleTypeModal
        opened={addTribeModalOpen}
        onClose={() => setAddTribeModalOpen(false)}
        onSubmit={submit}
      />
    </>
  );
}

export default TribeRoleTypeList;
