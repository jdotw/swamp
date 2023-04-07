import { useState } from "react";
import { Person, MutatePerson, usePerson } from "../../../Client/Person";
import { createStyles, Table, ScrollArea, Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import { MutatePersonModal } from "./MutatePersonModal";
import { MutateItemModalMode } from "../../../Components/MutateItemModal/MutateItemModal";
import { ImportPeopleModal } from "./ImportPeopleModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  unassignedRole: {
    backgroundColor: "#ff000040",
  },
}));

interface PersonListProps {}

export function PersonList(props: PersonListProps) {
  const { classes, theme } = useStyles();
  const { items, loading, createItem } = usePerson();
  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const rows = items.map((row: Person) => {
    const id = row.id.toString();
    const active_role = row.active_role_assignments?.[0]?.role;
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
        <td>
          <Link to={id}><Text className={!active_role && classes.unassignedRole}>{active_role?.role_type?.title ?? "unassigned"}</Text></Link>
        </td>
      </tr>
    );
  });

  const onAddSubmit = (newPerson: MutatePerson) => {
    (async () => {
      await createItem(newPerson);
      setAddPersonModalOpen(false);
    })();
  };

  const onImportSubmit = () => {
  	setImportModalOpen(false);
  }

  return (
    <>
      <div>
        <Table verticalSpacing="xs">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>External ID</th>
              <th>Current Role</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddPersonModalOpen(true)}>
            Onboard Person
          </Button>
          <Button onClick={() => setImportModalOpen(true)}>
            Import
          </Button>
        </div>
      </div>
      <MutatePersonModal
        title={"Onboard Person"}
        opened={addPersonModalOpen}
        onSubmit={onAddSubmit}
        mode="create"
        onClose={() => setAddPersonModalOpen(false)}
      />
	  <ImportPeopleModal opened={importModalOpen} onSubmit={onImportSubmit} onClose={() => setImportModalOpen(false)} />
    </>
  );
}

export default PersonList;
