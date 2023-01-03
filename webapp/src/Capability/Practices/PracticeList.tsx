import { useState } from "react";
import { createStyles, Table, ScrollArea, Button, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { usePractices } from "../../Client/Practices";
import { NewPractice, Practice } from "../../Client/Practice";
import { AddPracticeModal } from "./AddPracticeModal";

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
  const { classes, theme } = useStyles();
  const { practices, loading, add } = usePractices();
  const [addPracticeModalOpen, setAddPracticeModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const rows = practices.map((row: Practice) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`${id}`}>{row.name}</Link>
        </td>
      </tr>
    );
  });

  const submit = async (newPractice: NewPractice) => {
    await add(newPractice);
    setAddPracticeModalOpen(false);
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
          <Button onClick={() => setAddPracticeModalOpen(true)}>
            Add Practice
          </Button>
        </div>
      </div>
      <AddPracticeModal
        opened={addPracticeModalOpen}
        onClose={() => setAddPracticeModalOpen(false)}
        onSubmit={submit}
      />
    </>
  );
}

export default PracticeList;
