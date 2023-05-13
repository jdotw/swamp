import { Text, Button, createStyles, Table, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MutateLevel, useLevel, Level } from "../../../Client/Level";
import Loading from "../../../Components/Loading/Loading";
import { MutateLevelModal } from "./MutateLevelModal";
import { DeleteLevelConfirmModal } from "./DeleteLevelConfirmModal";

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
  titlesRow: {
    display: "inline",
    paddingLeft: 0,
  },
  retired: {
    color: "gray"
  }
}));

function LevelList() {
  const { classes } = useStyles();
  const { items, loading, createItem, updateItem } = useLevel();
  const [selectedLevel, setSelectedLevel] = useState<Level>();
  const [mutateLevelModalOpen, setMutateLevelModalOpen] = useState(false);
  const [deleteLevelModalOpen, setDeleteLevelModalOpen] = useState(false);
  if (loading) return <Loading />;

  const submitLevel = async (level: MutateLevel) => {
    if (selectedLevel) {
      await updateItem(selectedLevel.id, level);
    } else {
      await createItem(level);
    }
    setMutateLevelModalOpen(false);
  };

  const deleteLevel = async () => {
    if (selectedLevel) {
      const mutatation: MutateLevel = {
        index: selectedLevel.index,
        name: selectedLevel.name,
        parent_id: selectedLevel.parent_id,
        external_id: selectedLevel.external_id,
        retired_at_date: new Date().toISOString(),
      }
      await updateItem(selectedLevel.id, mutatation);
    }
    setDeleteLevelModalOpen(false);
  };

  const levelRow = (level: Level, indent: number) => (
    <tr key={level.id.toString()}>
      <td>
        <Link style={{ marginLeft: indent * 20 }} className={level.retired_at_date ? classes.retired : ""} to={level.id.toString()}>{level.index}</Link>
      </td>
      <td>
        <Link to={level.id.toString()} className={level.retired_at_date ? classes.retired : ""}>{level.name}</Link>
      </td>
      <td>
        <ul className={classes.titlesRow}>
          {level.titles.map((title, index) => (<li className={classes.titlesRow} key={title.id.toString()}><Link className={level.retired_at_date ? classes.retired : ""} key={title.id.toString()} to={"/org/titles/" + title.id.toString()}>{title.name}</Link>{index < (level.titles.length - 1) ? ", " : ""}</li>))}
        </ul>
      </td>
      <td>
        <Link className={level.retired_at_date ? classes.retired : ""} to={level.id.toString()}>{level.external_id}</Link>
      </td>
      <td className={classes.rowButtonBar}>
        {!level.retired_at_date && (<>
          <Button size="xs" variant="outline" color="blue" onClick={() => { setSelectedLevel(level); setMutateLevelModalOpen(true); }}>
            Edit
          </Button>
          <Button size="xs" variant="outline" color="red" onClick={() => { setSelectedLevel(level); setDeleteLevelModalOpen(true); }}>
            Delete
          </Button></>)}
      </td>
    </tr>
  );

  const levelRows = (items: Level[], parent?: Level, indent = 0) =>
    items.reduce((acc, level) => {
      if (level.parent_id == (parent?.id ?? 0)) {
        acc.push(levelRow(level, indent));
        acc.push(...levelRows(items, level, indent + 1));
      }
      return acc;
    }, [] as JSX.Element[]);

  return (
    <>
      <div>
        <Title order={3}>Levels</Title>
        <Text>Levels describe the ranks of seniorities for Roles</Text>
        <Table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Titles</th>
              <th>External ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{levelRows(items)}</tbody>
        </Table>
        <div className={classes.buttonBar}>
          <Button onClick={() => { setSelectedLevel(undefined); setMutateLevelModalOpen(true) }}>Add Level</Button>
        </div>
      </div>
      <MutateLevelModal
        level={selectedLevel}
        opened={mutateLevelModalOpen}
        onClose={() => setMutateLevelModalOpen(false)}
        onSubmit={submitLevel}
        parent_levels={items}
      />
      <DeleteLevelConfirmModal
        level={selectedLevel}
        opened={deleteLevelModalOpen}
        onConfirm={deleteLevel}
        onCancel={() => setDeleteLevelModalOpen(false)}
      />
    </>
  );
}

export default LevelList;
