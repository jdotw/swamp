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
import {
  usePractice,
  NewChapter,
  NewPracticeRole,
} from "../../../Client/Practice";
import { AddPracticeModal } from "../AddPracticeModal";
import { AddRoleModal } from "./AddRoleModal";
import { AddChapterModal } from "./AddChapterModal";
import { usePracticeRoleTypes } from "../../../Client/PracticeRoleTypes";

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

interface PracticeHomeProps {}

export function PracticeHome(props: PracticeHomeProps) {
  const { practiceId: id } = useParams();
  const { classes } = useStyles();
  const { practice, loading, addChapter } = usePractice({
    id: id,
  });
  const { roles, addRole, loading: loadingRoles } = usePracticeRoleTypes();
  const [addChapterModalOpen, setAddChapterModalOpen] = useState(false);
  const [addRoleModalOpen, setAddRoleModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }
  if (!id || !practice) {
    return <div>Practice not found</div>;
  }

  const chapterRows = practice.chapters
    ? practice.chapters.map((row) => {
        const id = row.id.toString();
        return (
          <tr key={id}>
            <td>
              <Link to={`chapters/${id}`}>{row.name}</Link>
            </td>
            <td>
              <Link to={`chapters/${id}`}>{row.lead_full_name}</Link>
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
              <Link to={`${id}`}>{row.practice_role_type.name}</Link>
            </td>
          </tr>
        );
      })
    : null;

  const submit = async (newChapter: NewChapter) => {
    await addChapter(newChapter);
    setAddChapterModalOpen(false);
  };

  const submitRole = async (newRole: NewPracticeRole) => {
    await addRole(newRole);
    setAddRoleModalOpen(false);
  };

  return (
    <>
      <div>
        <Title order={3}>Practice: {practice.name}</Title>
        <Title order={4}>Chapters</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>Name</th>
                <th>Lead</th>
              </tr>
            </thead>
            <tbody>{chapterRows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddChapterModalOpen(true)}>
            Add Chapter
          </Button>
        </div>
        <Title order={4}>Practice Roles</Title>
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
      <AddChapterModal
        opened={addChapterModalOpen}
        onClose={() => setAddChapterModalOpen(false)}
        onSubmit={submit}
      />
      <AddRoleModal
        practiceId={id}
        opened={addRoleModalOpen}
        onClose={() => setAddRoleModalOpen(false)}
        onSubmit={submitRole}
      />
    </>
  );
}

export default PracticeHome;
