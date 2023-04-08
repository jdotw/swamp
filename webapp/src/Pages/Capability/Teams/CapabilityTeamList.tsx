
import { Button, createStyles, ScrollArea, Table, Title, Text, Box } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MutateRoleType,
  RoleType,
  useRoleType,
} from "../../Client/RoleType";
import Loading from "../../Components/Loading/Loading";
import { MutateCapabilityModal } from "./MutateCapabilityModal";

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
  name: string;
  parent_id?: number;
  children?: CapabilityTeam[];
};

const mockData: CapabilityTeam[] = [
  {
    "id": 1,
    "name": "Backend Software Practice",
  },
  {
    id: 2,
    name: "C# Backend Chapter",
    parent_id: 1,
  },
  {
    id: 3,
    name: "Java Backend Chapter",
    parent_id: 1,
  },
  {
    id: 4,
    name: "Python Backend Chapter",
    parent_id: 1,
  },
  {
    id: 5,
    "name": "Frontend Software Practice",
  },
  {
    id: 6,
    name: "React Frontend Chapter",
    parent_id: 5,
  },
  {
    id: 7,
    name: "Angular Frontend Chapter",
    parent_id: 5,
  },
  {
    id: 8,
    name: "Vue Frontend Chapter",
    parent_id: 5,
  },
  {
    "id": 9,
    "name": "DevOps Practice",
  },
  {
    id: 10,
    name: "AWS DevOps Chapter",
    parent_id: 9,
  },
  {
    id: 11,
    name: "Azure DevOps Chapter",
    parent_id: 9,
  },
  {
    id: 12,
    name: "GCP DevOps Chapter",
    parent_id: 9,
  },
];

function CapabilityTeamList () {
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
          {team.name}
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
        <Title order={3}>Capability Teams</Title>
        <Text>A Capability Team is the "Home" team where Roles with the same Capabilites are housed.</Text>
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
      <MutateCapabilityModal
        capabilities={items}
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitNewCapability}
        mode="create"
      />
    </>
  );
}

export default CapabilityTeamList;
