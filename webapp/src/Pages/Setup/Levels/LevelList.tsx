import { Text, Button, createStyles, Table, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MutateLevel, useLevel, Level } from "../../../Client/Level";
import Loading from "../../../Components/Loading/Loading";
import { MutateLevelModal } from "./MutateLevelModal";

const useStyles = createStyles(() => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  titlesRow: {
    display: "inline",
    paddingLeft: 0,
  }
}));

function LevelList() {
  const { classes } = useStyles();
  const { items, loading, createItem } = useLevel();
  const [addLevelModalOpen, setAddLevelModalOpen] = useState(false);

  if (loading) return <Loading />;

  const submitNewLevel = async (newLevel: MutateLevel) => {
    await createItem(newLevel);
    setAddLevelModalOpen(false);
  };

  const levelRow = (level: Level, indent: number) => (
    <tr key={level.id.toString()}>
      <td>
        <Link style={{ marginLeft: indent * 20 }} to={level.id.toString()}>{level.index}</Link>
      </td>
      <td>
        <Link to={level.id.toString()}>{level.name}</Link>
      </td>
      <td>
        <ul className={classes.titlesRow}>
          {level.titles.map((title, index) => (<li className={classes.titlesRow} key={title.id.toString()}><Link key={title.id.toString()} to={"/org/titles/" + title.id.toString()}>{title.name}</Link>{index < (level.titles.length - 1) ? ", " : ""}</li>))}
        </ul>
      </td>
      <td>
        <Link to={level.id.toString()}>{level.external_id}</Link>
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
            </tr>
          </thead>
          <tbody>{levelRows(items)}</tbody>
        </Table>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddLevelModalOpen(true)}>Add Level</Button>
        </div>
      </div>
      <MutateLevelModal
        opened={addLevelModalOpen}
        onClose={() => setAddLevelModalOpen(false)}
        onSubmit={submitNewLevel}
        mode="create"
        parent_levels={items}
      />
    </>
  );
}

export default LevelList;
