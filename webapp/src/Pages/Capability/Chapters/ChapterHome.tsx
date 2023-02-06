import { useState } from "react";
import { useParams } from "react-router-dom";
import { createStyles, Table, ScrollArea, Button, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import { useChapter } from "../../../Client/Chapter";

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

        <br />
        <Title order={4}>Roles</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>Title</th>
                <th>Person</th>
                <th>Delivery Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Link to={"/org/roles/3"}>Senior Software Engineer</Link>
                </td>
                <td>John Thurman</td>
                <td>Deck of Cards Squad</td>
              </tr>
              <tr className={classes.vacantRole}>
                <td>Software Engineer</td>
                <td>vacant</td>
                <td>Pomprocks Squad</td>
              </tr>
              <tr>
                <td>Software Engineer</td>
                <td>Samuel Goleman</td>
                <td>Mythical Hair Band Squad</td>
              </tr>
              <tr>
                <td>Software Engineer</td>
                <td>Harish Thakkar</td>
                <td>Obscure For The Sake of It Squad</td>
              </tr>
              <tr className={classes.vacantRole}>
                <td>Software Engineer</td>
                <td>vacant</td>
                <td>Campbells Soup Squad</td>
              </tr>
            </tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Role</Button>
        </div>
      </div>
    </>
  );
}

export default ChapterHome;
