import { createStyles, Button, Grid, Text, Title } from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";
import {
  Capability,
  MutateCapability,
  useCapability,
} from "@/Client/Capability";
import {
  CapabilityType,
  useCapabilityType,
} from "@/Client/CapabilityTypes";
import { MutateDeployment, useDeployment } from "@/Client/Deployments";
import {
  MutateHomeAssignment,
  useHomeAssignment,
} from "@/Client/HomeAssignment";
import { useRole } from "@/Client/Role";
import {
  MutateRoleAssignment,
  useRoleAssignment,
} from "@/Client/RoleAssignment";
import Loading from "@/Components/Loading/Loading";
import RoleHistoryTimeline from "@/Components/RoleHistoryTimeline/RoleHistoryTimeline";
import { AssignHomeTeamModal } from "./AssignHomeTeamModal";
import { AssignPersonModal } from "./AssignPersonModal";
import { DeploymentModal } from "./DeploymentModal";
import { MutateManagerAssignment, useManagerAssignment } from "@/Client/ManagerAssignment";
import { PersonCard } from "@/Pages/Org/People/Person/PersonCard";
import { AssignManagerModal } from "./AssignManagerModal";
import { useRoleHistory } from "@/Client/RoleHistory";

export interface RoleHomeProps { }
const useStyles = createStyles(() => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  vacantRole: {
    backgroundColor: "#ff000040",
  },
  filledRole: {},
  tableHeader: {
    textAlign: "left",
  },
  capabilityTable: {
    width: "100%",
  },
  deploymentTable: {
    width: "100%",
  },
}));

function RoleHome() {
  const id = +useParams().roleId!;
  const { items, reload: reloadRole, loading } = useRole({ id });
  const { createItem: createRoleAssignment } = useRoleAssignment({
    roleId: id,
  });
  const { items: capabilityTypes } = useCapabilityType();
  const {
    items: capabilities,
    reload: reloadCapabilities,
    createItem: createCapability,
    deleteItem: deleteCapability,
  } = useCapability({ roleId: id });
  const { createItem: createHomeAssignment } = useHomeAssignment();
  const { createItem: createDeployment } = useDeployment();
  const { items: roleHistory, loading: loadingRoleHistory, reload: reloadRoleHistory } = useRoleHistory({ id });
  const { items: managerAssignments, createItem: createManagerAssignment } = useManagerAssignment({ roleId: id });
  const [assignPersonModalOpen, setAssignPersonModalOpen] =
    React.useState(false);
  const [assignManagerModalOpen, setAssignManagerModalOpen] =
    React.useState(false);
  const [assignHomeTeamModalOpen, setAssignHomeTeamModalOpen] =
    React.useState(false);
  const [deploymentModalOpen, setDeploymentModalOpen] = React.useState(false);
  const [selectedCapability, setSelectedCapability] =
    React.useState<Capability>();
  const { classes } = useStyles();

  if (loading) {
    return <Loading data-testid="loading-role-home" />;
  }

  if (items.length < 1) {
    return <div>Role not found</div>;
  }

  const role = items[0];
  const unassignedGlobalCapabilityTypes = capabilityTypes.filter(
    (p) =>
      !p.role_type_id &&
      capabilities?.find((c) => c.capability_type_id === p.id) === undefined
  );

  const unassignedRoleCapabilityTypes = capabilityTypes.filter(
    (p) =>
      p.role_type_id &&
      capabilities?.find((c) => c.capability_type_id === p.id) === undefined
  );

  const activeManagerAssignment = managerAssignments?.filter((p) => p.end_date === null)[0];

  const submitRoleAssignment = async (assignment: MutateRoleAssignment) => {
    await createRoleAssignment(assignment);
    await reloadRole();
    setAssignPersonModalOpen(false);
  };

  const submitManagerAssignment = async (assignment: MutateManagerAssignment) => {
    await createManagerAssignment(assignment);
    setAssignManagerModalOpen(false);
  };

  const addCapabilityClicked = async (capabilityType: CapabilityType) => {
    const newCapability: MutateCapability = {
      capability_type_id: capabilityType.id,
      role_id: role.id,
    };
    await createCapability(newCapability);
    await reloadRoleHistory();
  };

  const deleteCapabilityClicked = async (capability: Capability) => {
    await deleteCapability(capability.id);
    await reloadRoleHistory();
  };

  const assignHomeTeamClicked = async (capability: Capability) => {
    setSelectedCapability(capability);
    setAssignHomeTeamModalOpen(true);
  };

  const onAssignHomeTeamSubmit = async (assignment: MutateHomeAssignment) => {
    await createHomeAssignment(assignment);
    await reloadCapabilities();
    setAssignHomeTeamModalOpen(false);
  };

  const deployClicked = async (capability: Capability) => {
    setSelectedCapability(capability);
    setDeploymentModalOpen(true);
  };

  const onDeploymentSubmit = async (deployment: MutateDeployment) => {
    await createDeployment(deployment);
    await reloadCapabilities();
    setDeploymentModalOpen(false);
  };

  const capabilityRows = (capabilities?: Capability[]) =>
    capabilities?.map((capability) => (
      <tr key={capability.id.toString()}>
        <td>{capability.capability_type.name}</td>
        <td>
          {capability.active_home_assignment ? (
            capability.active_home_assignment.team.name
          ) : (
            <Button onClick={() => assignHomeTeamClicked(capability)}>
              Assign
            </Button>
          )}
        </td>
        <td>
          {capability.active_deployment ? (
            capability.active_deployment.team.name
          ) : (
            <Button onClick={() => deployClicked(capability)}>Deploy</Button>
          )}
        </td>
        <td></td>
        <td></td>
        <td>
          <Button onClick={() => deleteCapabilityClicked(capability)}>
            Delete
          </Button>
        </td>
      </tr>
    ));

  const capabilityTypeRows = (capabilityTypes?: CapabilityType[]) =>
    capabilityTypes?.map((capabilityType) => (
      <tr key={capabilityType.id.toString()}>
        <td>{capabilityType.name}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <Button onClick={() => addCapabilityClicked(capabilityType)}>
            Add
          </Button>
        </td>
      </tr>
    ));

  return (
    <>
      <div>
        <Title order={3}>
          Role: {role.role_type?.name} ({role.active_title_assignment.title.name})
        </Title>
        <br />
        <Grid>
          <Grid.Col xs={12} sm={8}>
            {role.active_role_assignment ? (
              <PersonCard
                person={role.active_role_assignment?.person}
                onEditClicked={() => { }}
              />
            ) : (
              <Text>Vacant</Text>
            )}
            <Button onClick={() => setAssignPersonModalOpen(true)}>
              Assign Person
            </Button>
            <Title order={5}>Manager</Title>
            {activeManagerAssignment ? (
              <><Text>{activeManagerAssignment.manager.active_role_assignment?.person.first_name} {activeManagerAssignment.manager.active_role_assignment?.person.last_name}</Text>
                <Button onClick={() => setAssignManagerModalOpen(true)}>Change Manager</Button></>
            ) : (
              <Button onClick={() => setAssignManagerModalOpen(true)}>Assign Manager</Button>)
            }
            <Title order={5}>Assigned Capabilities</Title>
            <table className={classes.capabilityTable}>
              <thead>
                <tr>
                  <th className={classes.tableHeader}>Capability</th>
                  <th className={classes.tableHeader}>Home Team</th>
                  <th className={classes.tableHeader}>Deployed To</th>
                  <th className={classes.tableHeader}>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{capabilityRows(capabilities)}</tbody>
            </table>
            <Title order={5}>Role-Specific Capabilities</Title>
            <table className={classes.capabilityTable}>
              <thead>
                <tr>
                  <th className={classes.tableHeader}>Capability</th>
                  <th className={classes.tableHeader}>Home Team</th>
                  <th className={classes.tableHeader}>Deployed To</th>
                  <th className={classes.tableHeader}>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{capabilityTypeRows(unassignedRoleCapabilityTypes)}</tbody>
            </table>
            <Title order={5}>Global Capabilities</Title>
            <table className={classes.capabilityTable}>
              <thead>
                <tr>
                  <th className={classes.tableHeader}>Capability</th>
                  <th className={classes.tableHeader}>Home Team</th>
                  <th className={classes.tableHeader}>Deployed To</th>
                  <th className={classes.tableHeader}>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {capabilityTypeRows(unassignedGlobalCapabilityTypes)}
              </tbody>
            </table>
            {/*
            <Title order={5}>Capability Assignment</Title>
            <ul>
              {role.capability_unit_assignment ? (
                <>
                  <li>
                    {role.capability_unit_assignment.function_type.name}
                    {" of "}
                    {role.capability_unit_assignment.unit.name}
                  </li>
                </>
              ) : (
                <>
                  <li>Unassigned</li>
                </>
              )}
            </ul>
            <Button
              onClick={() => {
                setMutatedAssignmentType("capability");
                setMutateUnitAssignModalOpen(true);
                setUnitAssignmentToMutate(role.capability_unit_assignment);
              }}
            >
              {role.capability_unit_assignment
                ? "Change Assignment"
                : "Assign to Unit"}
            </Button>
            <Title order={5}>Delivery Assignment</Title>
            <ul>
              {role.delivery_unit_assignment ? (
                <>
                  <li>
                    {role.delivery_unit_assignment.function_type.name}
                    {" of "}
                    {role.delivery_unit_assignment.unit.name}
                  </li>
                </>
              ) : (
                <>
                  <li>Unassigned</li>
                </>
              )}
            </ul>
            <Button
              onClick={() => {
                setMutatedAssignmentType("delivery");
                setUnitAssignmentToMutate(role.delivery_unit_assignment);
                setMutateUnitAssignModalOpen(true);
              }}
            >
              {role.delivery_unit_assignment
                ? "Change Assignment"
                : "Assign to Unit"}
            </Button>
            */}
          </Grid.Col>
          <Grid.Col xs={12} sm={4}>
            <RoleHistoryTimeline items={roleHistory} loading={loadingRoleHistory} />
          </Grid.Col>
        </Grid>
        <br />
      </div>
      <AssignPersonModal
        role={role}
        opened={assignPersonModalOpen}
        onSubmit={submitRoleAssignment}
        onClose={() => setAssignPersonModalOpen(false)}
      />
      <AssignManagerModal
        role={role}
        opened={assignManagerModalOpen}
        onSubmit={submitManagerAssignment}
        onClose={() => setAssignManagerModalOpen(false)}
      />
      <AssignHomeTeamModal
        capability={selectedCapability!}
        opened={assignHomeTeamModalOpen}
        onSubmit={onAssignHomeTeamSubmit}
        onClose={() => setAssignHomeTeamModalOpen(false)}
      />
      <DeploymentModal
        capability={selectedCapability!}
        opened={deploymentModalOpen}
        onSubmit={onDeploymentSubmit}
        onClose={() => setDeploymentModalOpen(false)}
      />
    </>
  );
}

export default RoleHome;
