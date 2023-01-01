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
import { usePractices } from "../../Client/Practices";
import { NewPractice, Practice } from "../../Client/Practice";
import { AddPracticeModal } from "../Practices/AddPracticeModal";
import {
  NewPracticeRoleType,
  PracticeRoleType,
  usePracticeRoleTypes,
} from "../../Client/PracticeRoleTypes";
import { AddPracticeRoleTypeModal } from "./AddPracticeRoleTypeModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

interface PracticeRoleTypeListProps {}

export function PracticeRoleTypeList(props: PracticeRoleTypeListProps) {
  const { classes, theme } = useStyles();
  const { roleTypes, addPracticeRoleType, loading, addError, adding } =
    usePracticeRoleTypes();
  const [addPracticeModalOpen, setAddPracticeModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const rows = roleTypes.map((row: PracticeRoleType) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`practiceroletypes/${id}`}>{row.name}</Link>
        </td>
      </tr>
    );
  });

  const submit = async (newPractice: NewPracticeRoleType) => {
    await addPracticeRoleType(newPractice);
    setAddPracticeModalOpen(false);
  };

  return (
    <>
      <div>
        <Title order={3}>Practice Role Types</Title>
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
          <Button onClick={() => setAddPracticeModalOpen(true)}>
            Add Role Type
          </Button>
        </div>
      </div>
      <AddPracticeRoleTypeModal
        opened={addPracticeModalOpen}
        onClose={() => setAddPracticeModalOpen(false)}
        onSubmit={submit}
      />
    </>
  );
}

export default PracticeRoleTypeList;
