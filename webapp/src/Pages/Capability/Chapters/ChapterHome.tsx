import { useState } from "react";
import { useParams } from "react-router-dom";
import { createStyles, Table, ScrollArea, Button, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import {
  Function,
  MutateFunction,
  useFunction,
} from "../../../Client/Function";
import { useChapter } from "../../../Client/Chapter";

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
  const id = +useParams().chapterId!;
  const practiceId = +useParams().practiceId!;
  const { classes, theme } = useStyles();
  const { items, reload, loading, error } = useChapter({
    practiceId: +practiceId!,
    id: +id!,
  });
  const chapter = items.length > 0 ? items[0] : undefined;

  const [addModalOpen, setAddModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  if (!id || !practiceId || !chapter) {
    return <div>Chapter not found</div>;
  }

  // const rows = functions.map((row: Function) => {
  //   const id = row.id.toString();
  //   return (
  //     <tr key={id}>
  //       <td>
  //         <Link to={`${id}`}>{row.role.person.first_name}</Link>
  //       </td>
  //       <td>
  //         <Link to={`${id}`}>{row.role.person.last_name}</Link>
  //       </td>
  //       <td>
  //         <Link to={`${id}`}>{row.name || row.function_type.name}</Link>
  //       </td>
  //     </tr>
  //   );
  // });

  // const submitAddFunction = async (newFunction: MutateFunction) => {
  //   await createFunctionItem(newFunction);
  //   setAddModalOpen(false);
  // };

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
            {/* <tbody>{rows}</tbody> */}
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Person</Button>
        </div>
      </div>
      {/* <AddFunctionModal
        chapterId={id}
        practiceId={practiceId}
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitAddFunction}
      /> */}
    </>
  );
}

export default ChapterHome;
