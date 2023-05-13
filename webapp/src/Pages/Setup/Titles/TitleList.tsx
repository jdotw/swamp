import { Text, Button, createStyles, Table, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MutateTitle, useTitle, Title as TitleType } from "../../../Client/Title";
import Loading from "../../../Components/Loading/Loading";
import { MutateTitleModal } from "./MutateTitleModal";
import { DeleteTitleConfirmModal } from "./DeleteTitleConfirmModal";

const useStyles = createStyles(() => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  rowButtonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  retired: {
    color: "gray"
  },
}));

function TitleList() {
  const { classes } = useStyles();
  const { items, loading, createItem, updateItem } = useTitle();
  const [selectedTitle, setSelectedTitle] = useState<TitleType>();
  const [mutateTitleModalOpen, setMutateTitleModalOpen] = useState(false);
  const [deleteTitleModalOpen, setDeleteTitleModalOpen] = useState(false);

  if (loading) return <Loading />;

  const submitTitle = async (newTitle: MutateTitle) => {
    if (selectedTitle) {
      await updateItem(selectedTitle.id, newTitle);
    } else {
      await createItem(newTitle);
    }
    setMutateTitleModalOpen(false);
  };

  const deleteTitle = async () => {
    if (selectedTitle) {
      const mutatation: MutateTitle = {
        name: selectedTitle.name,
        level_id: selectedTitle.level_id,
        track_id: selectedTitle.track_id,
        retired_at_date: new Date().toISOString(),
      }
      await updateItem(selectedTitle.id, mutatation);
    }
    setDeleteTitleModalOpen(false);
  };

  const titleRow = (title: TitleType) => (
    <tr key={title.id.toString()}>
      <td>
        <Link className={title.retired_at_date ? classes.retired : ""} to={title.id.toString()}>{title.name}</Link>
      </td>
      <td>
        <Link className={title.retired_at_date ? classes.retired : ""} to={title.id.toString()}>{title.level.index}</Link>
      </td>
      <td>
        <Link className={title.retired_at_date ? classes.retired : ""} to={title.id.toString()}>{title.track?.name ?? ""}</Link>
      </td>
      <td className={classes.rowButtonBar}>
        {!title.retired_at_date && (<>
          <Button onClick={() => { setSelectedTitle(title); setMutateTitleModalOpen(true) }}>Edit</Button>
          <Button onClick={() => { setSelectedTitle(title); setDeleteTitleModalOpen(true) }}>Delete</Button>
        </>)}
      </td>
    </tr >
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
              <th>Level</th>
              <th>Track</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{items.map((item) => titleRow(item))}</tbody>
        </Table>
        <div className={classes.buttonBar}>
          <Button onClick={() => setMutateTitleModalOpen(true)}>Add Title</Button>
        </div>
      </div>
      <MutateTitleModal
        title={selectedTitle}
        opened={mutateTitleModalOpen}
        onSubmit={submitTitle}
        onClose={() => setMutateTitleModalOpen(false)}
      />
      <DeleteTitleConfirmModal
        title={selectedTitle}
        opened={deleteTitleModalOpen}
        onConfirm={deleteTitle}
        onCancel={() => setDeleteTitleModalOpen(false)}
      />
    </>
  );
}

export default TitleList;
