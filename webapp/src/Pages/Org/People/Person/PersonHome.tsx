import { Grid, ScrollArea, Table, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  usePerson,
  Person as PersonType,
  MutatePerson,
} from "../../../../Client/Person";
import Loading from "../../../../Components/Loading/Loading";
import { timeSinceDateString } from "../../../../Utils/TimeSinceDate";
import { MutatePersonModal } from "../MutatePersonModal";
import { PersonCard } from "./PersonCard";

function PersonHome() {
  const id = +useParams().personId!;
  const { items, loading, updateItem } = usePerson({
    id,
  });

  // const { items: roles } = useRole({ personId: id });
  const [editModalOpened, setEditModalOpened] = useState(false);

  if (loading) {
    return <Loading />;
  }

  if (!id || items.length < 1) {
    return <div>Person not found</div>;
  }

  const person = items[0];

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
            <PersonCard person={person} onEditClicked={onEditClicked} />
          </Grid.Col>
          <Grid.Col span={8}>
            <Title order={3}>Current Role</Title>
            <ul>
              <li>Title: Software Engineer</li>
              <li>Level: Senior</li>
            </ul>
            <Title order={5}>Functions</Title>
            <ul>
              <li>Member: Checkout Squad</li>
              <li>Manager: Front-End Engineering Chapter</li>
            </ul>
          </Grid.Col>
        </Grid>
        <hr />
        <Title order={3}>History</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>Title</th>
                <th>Level</th>
                <th>Start Date</th>
                <th>Time in Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Software Engineer</td>
                <td>Senior</td>
                <td>2022-01-01</td>
                <td>1 year</td>
              </tr>
              <tr>
                <td>Software Engineer</td>
                <td>Associate</td>
                <td>2021-01-01</td>
                <td>1 year</td>
              </tr>
            </tbody>
            {/* <tbody>{roleRows()}</tbody> */}
          </Table>
        </ScrollArea>
        <hr />
        <Title order={3}>Assignments</Title>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>Unit</th>
                <th>Function</th>
                <th>Start Date</th>
                <th>Time in Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Squad</td>
                <td>Checkout</td>
                <td>2022-06-01</td>
                <td>6 months</td>
              </tr>
              <tr>
                <td>Squad</td>
                <td>Fulfillment</td>
                <td>2021-01-01</td>
                <td>18 months</td>
              </tr>
            </tbody>
            {/* <tbody>{roleRows()}</tbody> */}
          </Table>
        </ScrollArea>
      </div>
      <MutatePersonModal
        title={"Edit Person"}
        mode={"edit"}
        opened={editModalOpened}
        person={person}
        onSubmit={onEditSubmit}
        onClose={() => setEditModalOpened(false)}
      />
    </>
  );
}

export default PersonHome;
