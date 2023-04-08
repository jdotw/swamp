
import { Button, createStyles, ScrollArea, Table, Title, Text } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MutateRoleType,
  RoleType,
  useRoleType,
} from "../../../Client/RoleType";
import Loading from "../../../Components/Loading/Loading";
import { MutateCapabilityTypeModal } from "./MutateCapabilityTypeModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

interface CapabilityTeam {
  id: number;
  title: string;
  parent_id?: number;
  children?: CapabilityTeam[];
};

const mockData: CapabilityTeam[] = [
  {
    "id": 1,
    "title": "Backend Software Engineer",
  },
  {
    id: 2,
    title: "C# Backend Engineer",
    parent_id: 1,
  },
  {
    id: 3,
    title: "Java Backend Engineer",
    parent_id: 1,
  },
  {
    id: 4,
    title: "Python Backend Engineer",
    parent_id: 1,
  },
  {
    id: 5,
    "title": "Frontend Software Engineer",
  },
  {
    id: 6,
    title: "React Frontend Engineer",
    parent_id: 5,
  },
  {
    id: 7,
    title: "Angular Frontend Engineer",
    parent_id: 5,
  },
  {
    id: 8,
    title: "Vue Frontend Engineer",
    parent_id: 5,
  },
  {
    "id": 9,
    "title": "DevOps Engineer",
  },
  {
    id: 10,
    title: "AWS DevOps Engineer",
    parent_id: 9,
  },
  {
    id: 11,
    title: "Azure DevOps Engineer",
    parent_id: 9,
  },
  {
    id: 12,
    title: "GCP DevOps Engineer",
    parent_id: 9,
  },
];

function CapabilityHome() {
  const { classes } = useStyles();
  // const { items, loading, createItem } = useRoleType();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const items = mockData;

  // if (loading) return <Loading />;

  const submitNewCapability = async (newCapability: MutateCapability) => {
    // await createItem(newRoleType);
    setAddModalOpen(false);
  };

  const capabilityRow = (team: CapabilityTeam, level: number) => (
    <tr key={team.id.toString()}>
      <td>
        <Link style={{ marginLeft: level * 20 }} to={team.id.toString()}>
          {team.title}
        </Link>
      </td>
    </tr>
  );

  const capabilityRows = (items: CapabilityTeam[], parent?: CapabilityTeam, level = 0) =>
    items.reduce((acc, team) => {
      console.log("team.parent_id", team.parent_id);
      if (team.parent_id == parent?.id) {
        acc.push(capabilityRow(team, level));
        acc.push(...capabilityRows(items, team, level + 1));
      }
      return acc;
    }, [] as JSX.Element[]);

  return (
    <>
      <div>
        <Title order={3}>Capability Types</Title>
        <Text>A Capability is a specific skillset that an individual can have, or a particular duty that they perform within a team. For example, "React Front-End Engineer" would be a Capability that is deployed into a delivery team, where as "Chapter Lead" would be a Capability that is deployed into a Capability Home Team.</Text>
        <ScrollArea>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>{capabilityRows(mockData)}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Capability</Button>
        </div>
      </div>
      <MutateCapabilityTypeModal
        capabilities={items}
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitNewCapability}
        mode="create"
      />
    </>
  );
}

export default CapabilityHome;
