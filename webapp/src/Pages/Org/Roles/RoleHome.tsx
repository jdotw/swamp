import { createStyles, Button, Grid, Text, Title } from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";
import {
  CapabilityType,
  useCapabilityType,
} from "../../../Client/CapabilityTypes";
import { Role, useRole } from "../../../Client/Role";
import {
  MutateRoleAssignment,
  useRoleAssignment,
} from "../../../Client/RoleAssignment";
import Loading from "../../../Components/Loading/Loading";
import RoleHistoryTimeline from "../../../Components/RoleHistoryTimeline/RoleHistoryTimeline";
import { PersonCard } from "../People/Person/PersonCard";
import { AssignPersonModal } from "./AssignPersonModal";

export interface RoleHomeProps {}
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
  const [assignPersonModalOpen, setAssignPersonModalOpen] =
    React.useState(false);
  const { classes } = useStyles();

  if (loading) {
    return <Loading data-testid="loading-role-home" />;
  }

  if (items.length < 1) {
    return <div>Role not found</div>;
  }

  const role = items[0];
  const globalCapabilityTypes = capabilityTypes.filter((p) => !p.role_type_id);

  const submitRoleAssignment = async (assignment: MutateRoleAssignment) => {
    await createRoleAssignment(assignment);
    await reloadRole();
    setAssignPersonModalOpen(false);
  };

  const roleTitle = (role: Role) => {
    return `${role.active_level_assignment.level.individual_contributor_title} / ${role.active_level_assignment.level.manager_title}`;
  };

  const capabilityRows = (capabilityTypes?: CapabilityType[]) =>
    capabilityTypes?.map((capabilityType) => (
      <tr>
        <td>{capabilityType.name}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <Button>Add</Button>
        </td>
      </tr>
    ));

  return (
    <>
      <div>
        <Title order={3}>
          Role: {role.role_type?.name} ({roleTitle(role)})
        </Title>
        <br />
        <Grid>
          <Grid.Col xs={12} sm={8}>
            {role.active_role_assignment ? (
              <PersonCard
                person={role.active_role_assignment?.person}
                onEditClicked={() => {}}
              />
            ) : (
              <Text>Vacant</Text>
            )}
            <Button onClick={() => setAssignPersonModalOpen(true)}>
              Assign Person
            </Button>
            <Title order={5}>Manager</Title>
            <Text>Chis Watson -- FAKE (TODO)</Text>
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
              <tbody>{capabilityRows(role.role_type?.capability_types)}</tbody>
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
              <tbody>{capabilityRows(globalCapabilityTypes)}</tbody>
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
            <RoleHistoryTimeline role={role} />
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
    </>
  );
}

export default RoleHome;
