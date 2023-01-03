import { Grid, ScrollArea, Table, Title } from "@mantine/core";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  useIndividual,
  Individual as IndividualType,
  MutateIndividual,
} from "../../Client/Individual";
import { PracticeRole } from "../../Client/Practice";
import Loading from "../../Loading/Loading";
import {
  MutateIndividualModal,
  MutateIndividualModalMode,
} from "../MutateIndividualModal";
import { IndividualCard } from "./Card";

function Individual() {
  const { individualId: id } = useParams();
  const {
    individual,
    loading: loadingIndividual,
    update: updateIndividual,
  } = useIndividual({
    id,
  });
  const [editModalOpened, setEditModalOpened] = useState(false);

  if (loadingIndividual) {
    return <Loading />;
  }
  if (!id || !individual) {
    return <div>Individual not found</div>;
  }

  const onEditSubmit = async (updatedIndividual: MutateIndividual) => {
    await updateIndividual(id, updatedIndividual);
    setEditModalOpened(false);
  };

  const onEditClicked = () => {
    setEditModalOpened(true);
  };

  const practiceRoles: PracticeRole[] = [
    {
      id: "1",
      practice_role_type: {
        id: 1,
        name: "Physician",
      },
      individual_id: "1",
      individual: {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        external_id: "123",
      },
      practice_id: "1",
      practice: {
        id: "1",
        name: "Practice 1",
      },
    },
  ];

  const roleRows = () => {
    const practiceRows = practiceRoles.map((row: PracticeRole) => {
      const id = row.id.toString();
      return (
        <tr key={id}>
          <td>
            <Link to={id}>Practice</Link>
          </td>
          <td>
            <Link to={id}>{row.practice_role_type.name}</Link>
          </td>
          <td>
            <Link to={id}>{row.practice_id}</Link>
          </td>
          <td>
            <Link to={id}>TBD: Tenure</Link>
          </td>
        </tr>
      );
    });
    return [...practiceRows];
  };

  return (
    <>
      <div>
        <Grid>
          <Grid.Col span={4}>
            <IndividualCard
              individual={individual}
              onEditClicked={onEditClicked}
            />
          </Grid.Col>
          <Grid.Col span={8}>Other Info here</Grid.Col>
        </Grid>
        <Title order={3}>Roles</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>Type</th>
                <th>Title</th>
                <th>Unit</th>
                <th>Tenure</th>
              </tr>
            </thead>
            <tbody>{roleRows()}</tbody>
          </Table>
        </ScrollArea>
      </div>
      <MutateIndividualModal
        title={"Edit Individual"}
        mode={MutateIndividualModalMode.Edit}
        opened={editModalOpened}
        individual={individual}
        onSubmit={onEditSubmit}
        onClose={() => setEditModalOpened(false)}
      />
    </>
  );
}

export default Individual;
