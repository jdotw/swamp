import { Text, Button, createStyles, Table, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import { MutateLevelModal } from "./MutateLevelModal";
import { DeleteLevelConfirmModal } from "./DeleteLevelConfirmModal";
import { trpc, Level, LevelCreateInput, LevelUpdateInput } from "@/Utils/trpc";

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
    color: "gray",
  },
}));

function LevelList() {
  const { classes } = useStyles();
  const [selectedLevel, setSelectedLevel] = useState<Level>();
  const [mutateLevelModalOpen, setMutateLevelModalOpen] = useState(false);
  const [deleteLevelModalOpen, setDeleteLevelModalOpen] = useState(false);
  const levelQuery = trpc.levels.list.useQuery();
  const levelCreator = trpc.levels.create.useMutation();
  const levelUpdater = trpc.levels.update.useMutation();
  const levelDeleter = trpc.levels.delete.useMutation();

  if (levelQuery.isLoading) return <Loading />;

  const submitLevel = async (level: LevelCreateInput | LevelUpdateInput) => {
    if (selectedLevel) {
      await levelUpdater.mutateAsync({
        id: selectedLevel.id,
        level: level as LevelUpdateInput,
      });
    } else {
      await levelCreator.mutateAsync(level as LevelCreateInput);
    }
    await levelQuery.refetch();
    setMutateLevelModalOpen(false);
  };

  const deleteLevel = async () => {
    if (selectedLevel) {
      await levelDeleter.mutateAsync(selectedLevel.id);
    }
    await levelQuery.refetch();
    setDeleteLevelModalOpen(false);
  };

  const levelRow = (level: Level, indent: number) => (
    <tr key={level.id.toString()}>
      <td>
        <Link
          style={{ marginLeft: indent * 20 }}
          className={level.retired_at ? classes.retired : ""}
          to={level.id.toString()}
        >
          {level.index}
        </Link>
      </td>
      <td>
        <Link
          to={level.id.toString()}
          className={level.retired_at ? classes.retired : ""}
        >
          {level.name}
        </Link>
      </td>
      <td>
        <ul className={classes.titlesRow}>
          {level.titles?.map((title, index) => (
            <li className={classes.titlesRow} key={title.id.toString()}>
              <Link
                className={level.retired_at ? classes.retired : ""}
                key={title.id.toString()}
                to={"/org/titles/" + title.id.toString()}
              >
                {title.name}
              </Link>
              {index < (level.titles?.length ?? 0) - 1 ? ", " : ""}
            </li>
          ))}
        </ul>
      </td>
      <td>
        <Link
          className={level.retired_at ? classes.retired : ""}
          to={level.id.toString()}
        >
          {level.external_id}
        </Link>
      </td>
      <td className={classes.rowButtonBar}>
        {!level.retired_at && (
          <>
            <Button
              size="xs"
              variant="outline"
              color="blue"
              onClick={() => {
                setSelectedLevel(level);
                setMutateLevelModalOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              size="xs"
              variant="outline"
              color="red"
              onClick={() => {
                setSelectedLevel(level);
                setDeleteLevelModalOpen(true);
              }}
            >
              Delete
            </Button>
          </>
        )}
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

  console.log("levelQuery.data", levelQuery.data);

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
          <tbody>{levelRows(levelQuery.data ?? [])}</tbody>
        </Table>
        <div className={classes.buttonBar}>
          <Button
            onClick={() => {
              setSelectedLevel(undefined);
              setMutateLevelModalOpen(true);
            }}
          >
            Add Level
          </Button>
        </div>
      </div>
      <MutateLevelModal
        level={selectedLevel}
        opened={mutateLevelModalOpen}
        onClose={() => setMutateLevelModalOpen(false)}
        onSubmit={submitLevel}
        parent_levels={levelQuery.data}
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
