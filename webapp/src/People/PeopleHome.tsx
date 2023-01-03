import React, { useState } from "react";
import { usePeople } from "../Client/People";
import {
  Individual,
  MutateIndividual,
  useIndividual,
} from "../Client/Individual";
import { createStyles, Table, ScrollArea, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { MutateIndividualModal } from "./MutateIndividualModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

interface PeopleHomeProps {}

export function PeopleHome(props: PeopleHomeProps) {
  const { classes, theme } = useStyles();
  const { people, loading: loadingPeople, add: addIndividual } = usePeople();
  const [addIndividualModalOpen, setAddIndividualModalOpen] = useState(false);

  if (loadingPeople) {
    return <Loading />;
  }

  const rows = people.map((row: Individual) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={id}>{row.id}</Link>
        </td>
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

  const onAddSubmit = async (newIndividual: MutateIndividual) => {
    await addIndividual(newIndividual);
    setAddIndividualModalOpen(false);
  };

  return (
    <>
      <div>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>External ID</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddIndividualModalOpen(true)}>
            Onboard Individual
          </Button>
        </div>
      </div>
      <MutateIndividualModal
        title={"Onboard Individual"}
        opened={addIndividualModalOpen}
        onSubmit={onAddSubmit}
        onClose={() => setAddIndividualModalOpen(false)}
      />
    </>
  );
}

export default PeopleHome;
