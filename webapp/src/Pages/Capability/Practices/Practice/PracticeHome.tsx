import { useState } from "react";
import { createStyles, Table, ScrollArea, Button, Title } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../../Components/Loading/Loading";
import { MutateChapterModal } from "./MutateChapterModal";
import { usePractice } from "../../../../Client/Practice";
import { MutateChapter, useChapter } from "../../../../Client/Chapter";
import RoleListTable from "../../../../Components/RoleListTable/RoleListTable";

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
  const id = +useParams().practiceId!;
  const { classes } = useStyles();
  const { items, loading } = usePractice({ id: +id! });
  const {
    items: chapterItems,
    loading: loadingChapterItems,
    createItem: createChapterItem,
  } = useChapter({ practiceId: +id! });
  const [addChapterModalOpen, setMutateChapterModalOpen] = useState(false);

  const practice = items.length > 0 ? items[0] : undefined;

  if (loading || loadingChapterItems) {
    return <Loading />;
  }
  if (!id || !practice) {
    return <div>Practice not found</div>;
  }

  const chapterRows = chapterItems.map((row) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`chapters/${id}`}>{row.name}</Link>
        </td>
      </tr>
    );
  });

  const submitNewChapter = async (newChapter: MutateChapter) => {
    await createChapterItem(newChapter);
    setMutateChapterModalOpen(false);
  };

  return (
    <>
      <div>
        <Title order={3}>Practice: {practice.name}</Title>
        <Title order={4}>Chapters</Title>
        <ScrollArea>
          <Table verticalSpacing="xs" data-testid="chapters-table">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>{chapterRows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setMutateChapterModalOpen(true)}>
            Add Chapter
          </Button>
        </div>
        <br />
        <Title order={4}>Practice Roles</Title>
        <RoleListTable unitId={id} unitType={"practice"} />
      </div>
      <MutateChapterModal
        opened={addChapterModalOpen}
        onClose={() => setMutateChapterModalOpen(false)}
        onSubmit={submitNewChapter}
      />
    </>
  );
}

export default PracticeHome;
