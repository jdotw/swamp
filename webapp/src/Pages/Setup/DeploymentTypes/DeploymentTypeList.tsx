import {
  Text,
  Button,
  createStyles,
  ScrollArea,
  Table,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DeploymentType,
  MutateDeploymentType,
  useDeploymentType,
} from "../../../Client/DeploymentTypes";
import Loading from "../../../Components/Loading/Loading";
import { MutateDeploymentTypeModal } from "./MutateDeploymentTypeModal";
import { DeleteDeploymentTypeConfirmModal } from "./DeleteDeploymentTypeConfirmModal";

const useStyles = createStyles(() => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  rowButtonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  retired: {
    color: "gray",
  },
}));

function DeploymentTypeList() {
  const { classes } = useStyles();
  const { items, loading, createItem, updateItem, deleteItem } =
    useDeploymentType();
  const [selectedDeploymentType, setSelectedDeploymentType] =
    useState<DeploymentType>();
  const [mutateModalOpen, setMutateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  if (loading) return <Loading />;

  const submitDeploymentType = async (
    newDeploymentType: MutateDeploymentType
  ) => {
    if (selectedDeploymentType) {
      await updateItem(selectedDeploymentType.id, newDeploymentType);
    } else {
      await createItem(newDeploymentType);
    }
    setMutateModalOpen(false);
  };

  const deleteDeploymentType = async () => {
    if (selectedDeploymentType) {
      await deleteItem(selectedDeploymentType.id);
    }
    setDeleteModalOpen(false);
  };

  const deploymentTypeRow = (deploymentType: DeploymentType, level: number) => (
    <tr key={deploymentType.id.toString()}>
      <td>
        <Link
          className={deploymentType.retired_at ? classes.retired : ""}
          style={{ marginLeft: level * 20 }}
          to={deploymentType.id.toString()}
        >
          {deploymentType.name}
        </Link>
      </td>
      <td className={classes.rowButtonBar}>
        {!deploymentType.retired_at && (
          <>
            <Button
              onClick={() => {
                setSelectedDeploymentType(deploymentType);
                setMutateModalOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setSelectedDeploymentType(deploymentType);
                setDeleteModalOpen(true);
              }}
            >
              Delete
            </Button>
          </>
        )}
      </td>
    </tr>
  );

  const deploymentTypeRows = (
    items: DeploymentType[],
    parent?: DeploymentType,
    level = 0
  ) =>
    items.reduce((acc, deploymentType) => {
      if (deploymentType.parent_id == parent?.id) {
        acc.push(deploymentTypeRow(deploymentType, level));
        acc.push(...deploymentTypeRows(items, deploymentType, level + 1));
      }
      return acc;
    }, [] as JSX.Element[]);

  return (
    <>
      <div>
        <Title order={3}>Deployment Types</Title>
        <Text>
          Deployment Types describe how a Capability is deployed into a Team.
          For example, the Capability might be a member of the team
          (contributor), the Manager of the team, or a Support role in the team.
        </Text>
        <ScrollArea>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{deploymentTypeRows(items)}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button
            onClick={() => {
              setSelectedDeploymentType(undefined);
              setMutateModalOpen(true);
            }}
          >
            Add Deployment Type
          </Button>
        </div>
      </div>
      <MutateDeploymentTypeModal
        deploymentType={selectedDeploymentType}
        parentCandidates={items}
        opened={mutateModalOpen}
        onSubmit={submitDeploymentType}
        onClose={() => setMutateModalOpen(false)}
      />
      <DeleteDeploymentTypeConfirmModal
        deploymentType={selectedDeploymentType}
        opened={deleteModalOpen}
        onConfirm={deleteDeploymentType}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </>
  );
}

export default DeploymentTypeList;
