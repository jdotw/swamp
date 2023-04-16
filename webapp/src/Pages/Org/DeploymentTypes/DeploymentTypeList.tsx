
import { Text, Button, createStyles, ScrollArea, Table, Title } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DeploymentType, MutateDeploymentType, useDeploymentType } from "../../../Client/DeploymentTypes";
import {
  MutateRoleType,
  RoleType,
  useRoleType,
} from "../../../Client/RoleType";
import Loading from "../../../Components/Loading/Loading";
import { MutateDeploymentTypeModal } from "./MutateDeploymentTypeModal";
// import { MutateDeploymentTypeModal } from "./MutateDeploymentTypeModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

function DeploymentTypeList() {
  const { classes } = useStyles();
  const { items, loading, createItem } = useDeploymentType();
  const [addModalOpen, setAddModalOpen] = useState(false);

  if (loading) return <Loading />;

  const submitNewDeploymentType = async (newDeploymentType: MutateDeploymentType) => {
    await createItem(newDeploymentType);
    setAddModalOpen(false);
  };

  const deploymentTypeRow = (deploymentType: DeploymentType, level: number) => (
    <tr key={deploymentType.id.toString()}>
      <td>
        <Link style={{ marginLeft: level * 20 }} to={deploymentType.id.toString()}>
          {deploymentType.name}
        </Link>
      </td>
    </tr>
  );

  const deploymentTypeRows = (items: DeploymentType[], parent?: DeploymentType, level = 0) =>
    items.reduce((acc, deploymentType) => {
      if (deploymentType.parent_id == (parent?.id ?? 0)) {
        acc.push(deploymentTypeRow(deploymentType, level));
        acc.push(...deploymentTypeRows(items, deploymentType, level + 1));
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
            <tbody>{deploymentTypeRows(items)}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Deployment Type</Button>
        </div>
      </div>
      <MutateDeploymentTypeModal
        parentCandidates={items}
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitNewDeploymentType}
        mode="create"
      />
    </>
  );
}

export default DeploymentTypeList;
