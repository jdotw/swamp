import { useState } from "react";
import { createStyles, Table, ScrollArea, Button, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../../Loading/Loading";
import {
  NewPracticeRoleType,
  PracticeRoleType,
  usePracticeRoleTypes,
} from "../../Client/PracticeRoleTypes";
import { AddPracticeRoleTypeModal } from "./AddPracticeRoleTypeModal";
import {
  ChapterRoleType,
  NewChapterRoleType,
  useChapterRoleTypes,
} from "../../Client/ChapterRoleTypes";
import { AddChapterRoleTypeModal } from "./AddChaperRoleTypeModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

interface CapabilityRoleTypesHomeProps {}

export function CapabilityRoleTypesHome(props: CapabilityRoleTypesHomeProps) {
  const { classes, theme } = useStyles();
  const {
    roleTypes: practiceRoleTypes,
    addPracticeRoleType,
    loading: loadingPracticeRoleTypes,
  } = usePracticeRoleTypes();
  const {
    roleTypes: chapterRoleTypes,
    addChapterRoleType,
    loading: loadingChapterRoleTypes,
  } = useChapterRoleTypes();
  const [addPracticeRoleTypeModalOpen, setAddPracticeRoleTypeModalOpen] =
    useState(false);
  const [addChapterRoleTypeModalOpen, setAddChapterRoleTypeModalOpen] =
    useState(false);

  if (loadingPracticeRoleTypes || loadingChapterRoleTypes) {
    return <Loading />;
  }

  const practiceRows = practiceRoleTypes.map((row: PracticeRoleType) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`practiceroletypes/${id}`}>{row.name}</Link>
        </td>
      </tr>
    );
  });

  const chapterRows = chapterRoleTypes.map((row: ChapterRoleType) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`chapterroletypes/${id}`}>{row.name}</Link>
        </td>
      </tr>
    );
  });

  const submitPracticeRoleType = async (newPractice: NewPracticeRoleType) => {
    await addPracticeRoleType(newPractice);
    setAddPracticeRoleTypeModalOpen(false);
  };

  const submitChapterRoleType = async (newChapter: NewChapterRoleType) => {
    await addChapterRoleType(newChapter);
    setAddChapterRoleTypeModalOpen(false);
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
            <tbody>{practiceRows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddPracticeRoleTypeModalOpen(true)}>
            Add Practice Role Type
          </Button>
        </div>
      </div>
      <div>
        <Title order={3}>Chapter Role Types</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>{chapterRows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddChapterRoleTypeModalOpen(true)}>
            Add Chapter Role Type
          </Button>
        </div>
      </div>
      <AddPracticeRoleTypeModal
        opened={addPracticeRoleTypeModalOpen}
        onClose={() => setAddPracticeRoleTypeModalOpen(false)}
        onSubmit={submitPracticeRoleType}
      />
      <AddChapterRoleTypeModal
        opened={addChapterRoleTypeModalOpen}
        onClose={() => setAddChapterRoleTypeModalOpen(false)}
        onSubmit={submitChapterRoleType}
      />
    </>
  );
}

export default CapabilityRoleTypesHome;
