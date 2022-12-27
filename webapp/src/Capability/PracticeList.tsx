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
import { usePractices } from "../Client/Practices";
import { Practice as PracticeType } from "../Client/Practice";

const useStyles = createStyles((theme) => ({}));

interface PracticeListProps {}

export function PracticeList(props: PracticeListProps) {
  const { classes, theme } = useStyles();
  const { practices, loading } = usePractices();

  if (loading) {
    return <Loading />;
  }

  const rows = practices.map((row: PracticeType) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={id}>{row.name}</Link>
        </td>
        <td>
          <Link to={id}>{row.lead_full_name}</Link>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table verticalSpacing="xs">
        <thead>
          <tr>
            <th>Name</th>
            <th>Lead</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default PracticeList;
