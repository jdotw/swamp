import { useState } from "react";
import { createStyles, Table, ScrollArea, Button, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import {
  MutatePractice,
  Practice,
  usePractice,
} from "../../../Client/Practice";
import { MutatePracticeModal } from "./MutatePracticeModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

interface PracticeListProps {}

export function PracticeList(props: PracticeListProps) {
  const { classes } = useStyles();
  const { items, loading, createItem } = usePractice();
  const [addPracticeModalOpen, setMutatePracticeModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const rows = items.map((row: Practice) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`${id}`}>{row.name}</Link>
        </td>
      </tr>
    );
  });

  const submitNewPractice = async (newPractice: MutatePractice) => {
    await createItem(newPractice);
    setMutatePracticeModalOpen(false);
  };

  return (
    <>
      <div>
        <Title order={3}>Practices</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setMutatePracticeModalOpen(true)}>
            Add Practice
          </Button>
        </div>
      </div>
      <MutatePracticeModal
        title="Add Practice"
        mode="create"
        opened={addPracticeModalOpen}
        onClose={() => setMutatePracticeModalOpen(false)}
        onSubmit={submitNewPractice}
      />
    </>
  );
}

export default PracticeList;
