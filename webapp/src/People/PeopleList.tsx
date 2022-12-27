import React from "react";
import { usePeople } from "../Client/People";
import { Individual } from "../Client/Individual";

import {
  createStyles,
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  ScrollArea,
} from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

interface PeopleListProps {}

export function PeopleList(props: PeopleListProps) {
  const { classes, theme } = useStyles();
  const { people, loading: loadingPeople } = usePeople();

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

  return (
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
  );
}

export default PeopleList;
