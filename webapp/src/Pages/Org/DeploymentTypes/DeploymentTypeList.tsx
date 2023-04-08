
import { Text, Button, createStyles, ScrollArea, Table, Title } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MutateRoleType,
  RoleType,
  useRoleType,
} from "../../../Client/RoleType";
import Loading from "../../../Components/Loading/Loading";
// import { MutateDeploymentTypeModal } from "./MutateDeploymentTypeModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

interface DeploymentType {
  id: number;
  title: string;
  parent_id?: number;
  children?: DeploymentType[];
};

const mockData: DeploymentType[] = [
  {
    "id": 1,
    "title": "Member",
  },
  {
    id: 2,
    title: "Manager",
  },
  {
    id: 3,
    title: "Support",
  },
]

function DeploymentTypeList() {
  const { classes } = useStyles();
  // const { items, loading, createItem } = useRoleType();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const items = mockData;

  // if (loading) return <Loading />;

  const submitNewDeploymentType = async (newDeploymentType: MutateDeploymentType) => {
    // await createItem(newRoleType);
    setAddModalOpen(false);
  };

  const capabilityRow = (team: DeploymentType, level: number) => (
    <tr key={team.id.toString()}>
      <td>
        <Link style={{ marginLeft: level * 20 }} to={team.id.toString()}>
          {team.title}
        </Link>
      </td>
    </tr>
  );

  const capabilityRows = (items: DeploymentType[], parent?: DeploymentType, level = 0) =>
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
        <Title order={3}>Deployment Types</Title>
        <Text>Deployment Types describe how a Capability is deployed into a Team. For example, the Capability might be a member of the team (contributor), the Manager of the team, or a Support role in the team.</Text>
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
          <Button onClick={() => setAddModalOpen(true)}>Add Deployment Type</Button>
        </div>
      </div>
      {/*
      <MutateDeploymentTypeModal
        capabilities={items}
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitNewDeploymentType}
        mode="create"
      />
      */}
    </>
  );
}

export default DeploymentTypeList;
