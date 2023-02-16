import { useState } from "react";
import { useParams } from "react-router-dom";
import { createStyles, Table, ScrollArea, Button, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import { useChapter } from "../../../Client/Chapter";
import { useRole } from "../../../Client/Role";
import RoleListTable from "../../../Components/RoleListTable/RoleListTable";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  vacantRole: {
    backgroundColor: "#ff000040",
  },
  filledRole: {},
}));

interface ChapterHomeProps {}

function ChapterHome(props: ChapterHomeProps) {
  const practiceId = +useParams().practiceId!;
  const id = +useParams().chapterId!;
  const { classes } = useStyles();
  const { items, loading } = useChapter({
    practiceId: +practiceId!,
    id: +id!,
  });

  if (loading) {
    return <Loading />;
  }

  const chapter = items.length > 0 ? items[0] : undefined;

  if (!id || !practiceId || !chapter) {
    return <div>Chapter not found</div>;
  }

  return (
    <>
      <div>
        <Title order={3}>Chapter: {chapter.name}</Title>

        <br />
        <Title order={4}>Roles</Title>
        <RoleListTable
          parentUnitId={practiceId}
          unitId={id}
          unitType={"chapter"}
        />
      </div>
    </>
  );
}

export default ChapterHome;
