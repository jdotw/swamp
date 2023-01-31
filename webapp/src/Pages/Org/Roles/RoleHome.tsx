import { Button, Grid, Text, Timeline, Title } from "@mantine/core";
import {
  IconGitBranch,
  IconGitCommit,
  IconGitPullRequest,
  IconMessageDots,
} from "@tabler/icons";
import React from "react";
import { useParams } from "react-router-dom";
import { Person } from "../../../Client/Person";
import { useRole } from "../../../Client/Role";
import {
  MutateRoleAssignment,
  useRoleAssignment,
} from "../../../Client/RoleAssignment";
import { PersonCard } from "../People/Person/PersonCard";
import { AssignPersonModal } from "./AssignPersonModal";

function RoleHome() {
  const id = +useParams().roleId!;
  const { items } = useRole({ id });
  const { items: roleAssignment, createItem: createRoleAssignment } =
    useRoleAssignment({ roleId: id });
  const [assignPersonModalOpen, setAssignPersonModalOpen] =
    React.useState(false);

  if (items.length < 1) {
    return <div>Role not found</div>;
  }
  const role = items[0];

  console.log("ROLE: ", role);

  const submitRoleAssignment = async (assignment: MutateRoleAssignment) => {
    console.log("SUBMIT ROLE ASSIGNMENT: ", assignment);
    await createRoleAssignment(assignment);
    setAssignPersonModalOpen(false);
  };

  return (
    <>
      <div>
        <Title order={3}>
          Role: {role.assigned_level.individual_contributor_title}{" "}
          {role.role_type?.title}
        </Title>
        <br />
        <Grid>
          <Grid.Col span={4}>
            <PersonCard person={role.assigned_person} />
          </Grid.Col>
          <Grid.Col span={8}>
            <Title order={5}>Assignments</Title>
            <ul>
              a<li>Member of Checkout Squad</li>
              <li>Manager of Front-End Engineering Chapter</li>
            </ul>
          </Grid.Col>
        </Grid>
        <br />
        <Timeline active={1} bulletSize={24} lineWidth={2}>
          <Timeline.Item bullet={<IconGitBranch size={12} />} title="Promotion">
            <Text color="dimmed" size="sm">
              Senior Engineer
            </Text>
            <Text size="xs" mt={4}>
              1 year ago
            </Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconGitCommit size={12} />}
            title="Hired"
            lineVariant="dashed"
          >
            <Text color="dimmed" size="sm">
              James Bond hired into role
            </Text>
            <Text size="xs" mt={4}>
              2 years ago
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Role Vacant"
            bullet={<IconGitPullRequest size={12} />}
          >
            <Text color="dimmed" size="sm">
              Megan Hunter resigned
            </Text>
            <Text size="xs" mt={4}>
              2years, 6 months ago
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Hired"
            lineVariant="dashed"
            bullet={<IconMessageDots size={12} />}
          >
            <Text color="dimmed" size="sm">
              <Text variant="link" component="span" inherit>
                Megan Hunter
              </Text>{" "}
              hired into the role
            </Text>
            <Text size="xs" mt={4}>
              5 years ago
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Opened" bullet={<IconMessageDots size={12} />}>
            <Text color="dimmed" size="sm">
              Role was opened
            </Text>
            <Text size="xs" mt={4}>
              6 years ago
            </Text>
          </Timeline.Item>
        </Timeline>
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
    </>
  );
}

export default RoleHome;
