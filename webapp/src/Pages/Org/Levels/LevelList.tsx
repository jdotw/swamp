import { Text, Button, createStyles, ScrollArea, Table, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MutateLevel, useLevel, Level } from "../../../Client/Level";
import Loading from "../../../Components/Loading/Loading";
import { MutateLevelModal } from "./MutateLevelModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
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
        <Link to={level.id.toString()}>
          {level.individual_contributor_title}
        </Link>
      </td>
      <td>
        <Link to={level.id.toString()}>{level.manager_title}</Link>
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
        <Text>Levels describe the titles applied to the various seniorities for both individual contributors and manager Roles</Text>
        <Text>If a root level (no parent_id) has an individual_contributor_title then it can be applied to Individual Contributor Roles, and likewise if a manager_title is set then it can be applied to Manager Roles. Title variants can be configured as child levels where the Index must be the same as the parent level, but either an individual_contributor_title or manager_title varient can be specified. However, if the root level does not specify either and individual_contributor_title or a manager_title then the variants (child levels) also can not specify a varient for the title that is not set at the root level. </Text>
        <ScrollArea>
          <Table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Individual Contributor</th>
                <th>Management</th>
                <th>External ID</th>
              </tr>
            </thead>
            <tbody>{levelRows(items)}</tbody>
          </Table>
        </ScrollArea>
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
