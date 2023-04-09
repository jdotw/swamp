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

const fakeData: Level[] = [
  {
    id: 1,
    index: 1,
    individual_contributor_title: "Graduate",
    manager_title: null,
    external_id: "1",
  },
  {
    id: 2,
    index: 2,
    individual_contributor_title: "Associate",
    manager_title: null,
    external_id: "2",
  },
  {
    id: 3,
    index: 3,
    individual_contributor_title: "Senior",
    manager_title: "Manager",
    external_id: "3",
  },
  {
    id: 30,
    index: 3,
    individual_contributor_title: "",
    manager_title: "Head Of",
    external_id: "3a",
    parent_id: 3,
  },
  {
    id: 4,
    index: 4,
    individual_contributor_title: "Principal",
    manager_title: "Senior Manager",
    external_id: "4",
  },
  {
    id: 40,
    index: 4,
    individual_contributor_title: "Staff",
    manager_title: null,
    external_id: "4a",
    parent_id: 4,
  },
  {
    id: 5,
    index: 5,
    individual_contributor_title: "Chief",
    manager_title: "Director",
    external_id: "5",
  },
  {
    id: 6,
    index: 6,
    individual_contributor_title: "Distinguished",
    manager_title: "General Manager",
    external_id: "6",
  },
  {
    id: 7,
    index: 7,
    individual_contributor_title: null,
    manager_title: "Managing Director",
    external_id: "7",
  },
  {
    id: 70,
    index: 7,
    individual_contributor_title: null,
    manager_title: "CTO",
    external_id: "7a",
    parent_id: 7,
  },
  ];

function LevelList() {
  const { classes } = useStyles();
  // const { items, loading, createItem } = useLevel();
  const { loading, createItem } = useLevel();
  const [addLevelModalOpen, setAddLevelModalOpen] = useState(false);
  const items = fakeData;

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
      if (level.parent_id == parent?.id) {
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
      />
    </>
  );
}

export default LevelList;
