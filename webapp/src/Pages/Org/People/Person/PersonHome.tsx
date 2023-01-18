import { Grid, ScrollArea, Table, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ChapterRole } from "../../../Client/ChapterRole";
import {
  usePerson,
  Person as PersonType,
  MutatePerson,
} from "../../../../Client/Person";
import Loading from "../../../../Components/Loading/Loading";
import { timeSinceDateString } from "../../../../Utils/TimeSinceDate";
import { MutatePersonModal, MutatePersonModalMode } from "../MutatePersonModal";
import { PersonCard } from "./PersonCard";

function PersonHome() {
  const { individualId: id } = useParams();
  const { items, loading, updateItem } = usePerson({
    id,
  });
  const { items: roles } = useRole({ personId: id });
  const [editModalOpened, setEditModalOpened] = useState(false);

  if (loading) {
    return <Loading />;
  }
  if (!id || items.length < 1) {
    return <div>Person not found</div>;
  }

  const individual = items[0];

  // const roles: any = [];
  // const roleRows = () =>
  //   roles.map((row: TribeRole) => {
  //     const id = row.id.toString();
  //     return (
  //       <tr key={"role" + id}>
  //         <td>
  //           <Link to={id}>Tribe</Link>
  //         </td>
  //         <td>
  //           <Link to={id}>{row.tribe.name}</Link>
  //         </td>
  //         <td>
  //           <Link to={id}>{row.tribe_role_type.name}</Link>
  //         </td>
  //         <td>
  //           <Link to={id}>
  //             {timeSinceDateString(
  //               new Date(row.start_date),
  //               row.end_date ? new Date(row.end_date) : undefined
  //             )}
  //           </Link>
  //         </td>
  //       </tr>
  //     );
  //   });

  const onEditSubmit = async (updatedPerson: MutatePerson) => {
    await updateItem(id, updatedPerson);
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
            <PersonCard individual={individual} onEditClicked={onEditClicked} />
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
            {/* <tbody>{roleRows()}</tbody> */}
          </Table>
        </ScrollArea>
      </div>
      <MutatePersonModal
        title={"Edit Person"}
        mode={MutatePersonModalMode.Edit}
        opened={editModalOpened}
        individual={individual}
        onSubmit={onEditSubmit}
        onClose={() => setEditModalOpened(false)}
      />
    </>
  );
}

export default PersonHome;
