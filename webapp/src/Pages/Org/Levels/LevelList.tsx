import { Text, Button, createStyles, ScrollArea, Table, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MutateLevel, useLevel } from "../../../Client/Level";
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

  const levelElements = items.map((level) => (
    <tr key={level.id.toString()}>
      <td>
        <Link to={level.id.toString()}>{level.index}</Link>
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
  ));

  return (
    <>
      <div>
        <Title order={3}>Levels</Title>
        <Text>Levels describe the titles applied to the various seniorities for both individual contributors and manager Roles</Text>
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
            <tbody>{levelElements}</tbody>
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
