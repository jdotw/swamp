import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
import { Individual } from "../../Client/Individual";
import { ChapterRole, NewChapterRole, useChapter } from "../../Client/Chapter";
import { AddRoleModal } from "./AddRoleModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

interface ChapterHomeProps {}

function ChapterHome(props: ChapterHomeProps) {
  const { practiceId, chapterId: id } = useParams();
  const { classes, theme } = useStyles();
  const { chapter, roles, loadingRoles, addRole } = useChapter({
    practiceId,
    id,
  });
  const [addModalOpen, setAddModalOpen] = useState(false);

  if (loadingRoles) {
    return <Loading />;
  }

  if (!id || !practiceId || !chapter) {
    return <div>Chapter not found</div>;
  }

  const rows = roles.map((row: ChapterRole) => {
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
          <Link to={`${id}`}>{row.chapter_role_type.name}</Link>
        </td>
      </tr>
    );
  });

  const submitAddRole = async (newRole: NewChapterRole) => {
    await addRole(newRole);
    setAddModalOpen(false);
  };

  return (
    <>
      <div>
        <Title order={3}>Chapter: {chapter.name}</Title>
        <Title order={4}>Members</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Person</Button>
        </div>
      </div>
      <AddRoleModal
        chapterId={id}
        practiceId={practiceId}
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitAddRole}
      />
    </>
  );
}

export default ChapterHome;
