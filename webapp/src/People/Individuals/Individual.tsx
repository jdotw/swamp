import { Grid, ScrollArea, Table, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  useIndividual,
  Individual as IndividualType,
  MutateIndividual,
} from "../../Client/Individual";
import { PracticeRole } from "../../Client/Practice";
import { SquadRole } from "../../Client/Squad";
import { TribeRole } from "../../Client/Tribe";
import Loading from "../../Loading/Loading";
import { timeSinceDateString } from "../../Utils/TimeSinceDate";
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
    getTribeRoles,
    tribeRoles,
    getSquadRoles,
    squadRoles,
  } = useIndividual({
    id,
  });
  const [editModalOpened, setEditModalOpened] = useState(false);

  useEffect(() => {
    getTribeRoles();
    getSquadRoles();
  }, [id]);

  if (loadingIndividual) {
    return <Loading />;
  }
  if (!id || !individual) {
    return <div>Individual not found</div>;
  }

  const roleRows = () => {
    const tribeRows = tribeRoles.map((row: TribeRole) => {
      const id = row.id.toString();
      return (
        <tr key={id}>
          <td>
            <Link to={id}>Tribe</Link>
          </td>
          <td>
            <Link to={id}>{row.tribe.name}</Link>
          </td>
          <td>
            <Link to={id}>{row.tribe_role_type.name}</Link>
          </td>
          <td>
            <Link to={id}>
              {timeSinceDateString(
                new Date(row.start_date),
                row.end_date ? new Date(row.end_date) : undefined
              )}
            </Link>
          </td>
        </tr>
      );
    });
    const squadRows = squadRoles.map((row: SquadRole) => {
      const id = row.id.toString();
      return (
        <tr key={id}>
          <td>
            <Link to={id}>Squad</Link>
          </td>
          <td>
            <Link to={id}>{row.squad.name}</Link>
          </td>
          <td>
            <Link to={id}>{row.squad_role_type.name}</Link>
          </td>
          <td>
            <Link to={id}>
              {timeSinceDateString(
                new Date(row.start_date),
                row.end_date ? new Date(row.end_date) : undefined
              )}
            </Link>
          </td>
        </tr>
      );
    });
    return [...tribeRows, ...squadRows];
  };

  const onEditSubmit = async (updatedIndividual: MutateIndividual) => {
    await updateIndividual(id, updatedIndividual);
    setEditModalOpened(false);
  };

  const onEditClicked = () => {
    setEditModalOpened(true);
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
                <th>Group</th>
                <th>Title</th>
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
