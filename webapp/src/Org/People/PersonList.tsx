import { useState } from "react";
import { Person, MutatePerson, usePerson } from "../../Client/Person";
import { createStyles, Table, ScrollArea, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { MutatePersonModal } from "./MutatePersonModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

interface PersonListProps {}

export function PersonList(props: PersonListProps) {
  const { classes, theme } = useStyles();
  const { items, loading, createItem } = usePerson();
  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const rows = items.map((row: Person) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={id}>{row.first_name}</Link>
        </td>
        <td>
          <Link to={id}>{row.last_name}</Link>
        </td>
        <td>
          <Link to={id}>{row.external_id}</Link>
        </td>
      </tr>
    );
  });

  const onAddSubmit = async (newPerson: MutatePerson) => {
    await createItem(newPerson);
    setAddPersonModalOpen(false);
  };

  return (
    <>
      <div>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>External ID</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddPersonModalOpen(true)}>
            Onboard Person
          </Button>
        </div>
      </div>
      <MutatePersonModal
        title={"Onboard Person"}
        opened={addPersonModalOpen}
        onSubmit={(v) => {
          onAddSubmit(v);
        }}
        onClose={() => setAddPersonModalOpen(false)}
      />
    </>
  );
}

export default PersonList;
