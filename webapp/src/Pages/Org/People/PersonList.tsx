import { useState } from "react";
import { Person, MutatePerson, usePerson } from "../../../Client/Person";
import { createStyles, Table, Button, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import { MutatePersonModal } from "./MutatePersonModal";
import { ImportPeopleModal } from "./ImportPeopleModal";
import { DeletePersonConfirmModal } from "./DeletePersonConfirmModal";

const useStyles = createStyles(() => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  rowButtonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  unassignedRole: {
    color: "red",
  },
}));

export function PersonList() {
  const { classes } = useStyles();
  const { items, loading, createItem, updateItem, deleteItem } = usePerson();
  const [mutatePersonModalOpen, setMutatePersonModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | undefined>(undefined);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const editClicked = (person: Person) => {
    setSelectedPerson(person);
    setMutatePersonModalOpen(true);
  }

  const deleteClicked = (person: Person) => {
    setSelectedPerson(person);
    setConfirmDeleteModalOpen(true);
  }

  const onDeleteConfirmed = () => {
    if (selectedPerson)
      deleteItem(selectedPerson.id);
    setConfirmDeleteModalOpen(false);
  }

  const rows = items.map((row: Person) => {
    const id = row.id.toString();
    const active_role = row.active_role_assignment?.role;
    const manager = active_role?.active_manager_assignment?.manager.active_role_assignment?.person;
    return (
      <tr key={id} data-testid={`person-${id}`}>
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
          <Link to={"/org/roles/" + id} data-testid="role-column-link"><Text className={active_role ? "" : classes.unassignedRole}>{active_role?.role_type?.name ?? "unassigned"}</Text></Link>
        </td >
        <td>
          <Link to={id}><Text className={manager ? "" : classes.unassignedRole}>{manager?.first_name ?? "unassigned"}</Text></Link>
        </td>
        <td>
          <div className={classes.rowButtonBar}><Button onClick={() => editClicked(row)}>Edit</Button><Button onClick={() => deleteClicked(row)}>Delete</Button></div>
        </td>
      </tr >
    );
  });

  const onPersonSubmit = (newPerson: MutatePerson) => {
    (async () => {
      if (selectedPerson) {
        await updateItem(selectedPerson.id, newPerson);
      } else {
        await createItem(newPerson);
      }
      setMutatePersonModalOpen(false);
    })();
  };

  const onImportSubmit = () => {
    setImportModalOpen(false);
  }

  return (
    <>
      <div>
        <Title order={2}>People</Title>
        <Text>This is the full list of people in our organisation.</Text>
        <Table verticalSpacing="xs">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>External ID</th>
              <th>Role</th>
              <th>Manager</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <div className={classes.buttonBar}>
          <Button onClick={() => setMutatePersonModalOpen(true)}>
            Onboard Person
          </Button>
          <Button onClick={() => setImportModalOpen(true)}>
            Import
          </Button>
        </div>
      </div>
      <MutatePersonModal
        person={selectedPerson}
        title={selectedPerson ? "Edit Person" : "Onboard Person"}
        opened={mutatePersonModalOpen}
        onSubmit={onPersonSubmit}
        onClose={() => setMutatePersonModalOpen(false)}
      />
      <ImportPeopleModal opened={importModalOpen} onSubmit={onImportSubmit} onClose={() => setImportModalOpen(false)} />
      <DeletePersonConfirmModal
        person={selectedPerson}
        opened={confirmDeleteModalOpen}
        onConfirm={onDeleteConfirmed}
        onCancel={() => setConfirmDeleteModalOpen(false)}
      />
    </>
  );
}

export default PersonList;
