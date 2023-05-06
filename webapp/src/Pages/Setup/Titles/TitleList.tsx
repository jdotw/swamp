import { Text, Button, createStyles, ScrollArea, Table, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MutateTitle, useTitle, Title as TitleType } from "../../../Client/Title";
import Loading from "../../../Components/Loading/Loading";
import { MutateTitleModal } from "./MutateTitleModal";

const useStyles = createStyles(() => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

function TitleList() {
  const { classes } = useStyles();
  const { items, loading, createItem } = useTitle();
  const [addTitleModalOpen, setAddTitleModalOpen] = useState(false);

  if (loading) return <Loading />;

  const submitNewTitle = async (newTitle: MutateTitle) => {
    await createItem(newTitle);
    setAddTitleModalOpen(false);
  };

  const titleRow = (title: TitleType) => (
    <tr key={title.id.toString()}>
      <td>
        <Link to={title.id.toString()}>{title.name}</Link>
      </td>
    </tr>
  );

  return (
    <>
      <div>
        <Title order={3}>Titles</Title>
        <Text>Titles are the level-bound (or level-generic) identity prefixes that are combined with the Role Type to form a description of a Role</Text>
        <Text>For example, a Role Type of &quot;Front-End Software Engineer&quot; might have a title of &quot;Senior&quot; at level &quot;4&quot;. This would result in the Role being deacribed as &quot;Senior Front-End Software Engineer&quot;</Text>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>{map(items, (item) => titleRow(item))}</tbody>
        </Table>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddTitleModalOpen(true)}>Add Title</Button>
        </div>
      </div>
      <MutateTitleModal
        opened={addTitleModalOpen}
        onClose={() => setAddTitleModalOpen(false)}
        onSubmit={submitNewTitle}
        mode="create"
        parent_titles={items}
      />
    </>
  );
}

export default TitleList;
