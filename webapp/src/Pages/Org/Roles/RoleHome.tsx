import { Button, Grid, Text, Timeline, Title } from "@mantine/core";
import {
  IconGitBranch,
  IconGitCommit,
  IconGitPullRequest,
  IconMessageDots,
} from "@tabler/icons";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Person } from "../../../Client/Person";
import { Role, UnitAssignment, useRole } from "../../../Client/Role";
import {
  MutateRoleAssignment,
  useRoleAssignment,
} from "../../../Client/RoleAssignment";
import { RoleHistory, useRoleHistory } from "../../../Client/RoleHistory";
import {
  MutateUnitAssignment,
  useUnitAssignment,
} from "../../../Client/UnitAssignment";
import Loading from "../../../Components/Loading/Loading";
import RoleHistoryTimeline from "../../../Components/RoleHistoryTimeline/RoleHistoryTimeline";
import { PersonCard } from "../People/Person/PersonCard";
import { AssignPersonModal } from "./AssignPersonModal";
import {
  MutateUnitAssignmentModal,
  MutateUnitAssignmentType,
} from "./MutateUnitAssignmentModal";

export interface RoleHomeProps {}

function RoleHome(props: RoleHomeProps) {
  const id = +useParams().roleId!;
  const { items, reload: reloadRole, loading } = useRole({ id });
  const { items: roleAssignments, createItem: createRoleAssignment } =
    useRoleAssignment({ roleId: id });
  const [assignPersonModalOpen, setAssignPersonModalOpen] =
    React.useState(false);
  const [mutateUnitAssignModalOpen, setMutateUnitAssignModalOpen] =
    useState<boolean>(false);
  const [mutatedAssignmentType, setMutatedAssignmentType] =
    useState<MutateUnitAssignmentType>("delivery");
  const [unitAssignmentToMutate, setUnitAssignmentToMutate] =
    useState<UnitAssignment>();
  const { items: unitAssignments, createItem: createUnitAssignment } =
    useUnitAssignment({ roleId: id });

  if (loading) {
    return <Loading data-testid="loading-role-home" />;
  }

  if (items.length < 1) {
    return <div>Role not found</div>;
  }
  const role = items[0];

  const submitRoleAssignment = async (assignment: MutateRoleAssignment) => {
    await createRoleAssignment(assignment);
    await reloadRole();
    setAssignPersonModalOpen(false);
  };
  const submitUnitAssignment = async (assignment: MutateUnitAssignment) => {
    await createUnitAssignment(assignment);
    await reloadRole();
    setMutateUnitAssignModalOpen(false);
  };

  const roleTitle = (role: Role) => {
    if (
      (role.delivery_unit_assignment &&
        !role.delivery_unit_assignment.function_type
          .is_individual_contributor) ||
      (role.capability_unit_assignment &&
        !role.capability_unit_assignment.function_type
          .is_individual_contributor)
    ) {
      return role.active_level_assignment.level.manager_title;
    } else {
      return role.active_level_assignment.level.individual_contributor_title;
    }
  };

  return (
    <>
      <div>
        <Title order={3}>
          Role: {role.role_type?.title} ({roleTitle(role)})
        </Title>
        <br />
        <Grid>
          <Grid.Col sm={12} md={4}>
            {role.active_role_assignment ? (
              <PersonCard
                person={role.active_role_assignment?.person}
                onEditClicked={() => {}}
              />
            ) : (
              <Text>Vacant</Text>
            )}
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
          </Grid.Col>
          <Grid.Col sm={12} md={8}>
            <RoleHistoryTimeline role={role} />
          </Grid.Col>
        </Grid>
        <br />
        <Button onClick={() => setAssignPersonModalOpen(true)}>
          Assign Person
        </Button>
      </div>
      <AssignPersonModal
        role={role}
        opened={assignPersonModalOpen}
        onSubmit={submitRoleAssignment}
        onClose={() => setAssignPersonModalOpen(false)}
      />
      <MutateUnitAssignmentModal
        role={role}
        opened={mutateUnitAssignModalOpen}
        onSubmit={submitUnitAssignment}
        onClose={() => setMutateUnitAssignModalOpen(false)}
        assignmentType={mutatedAssignmentType}
        unitAssignment={unitAssignmentToMutate}
      />
    </>
  );
}

export default RoleHome;
