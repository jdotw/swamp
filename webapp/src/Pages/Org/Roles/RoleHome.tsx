import { Grid, Text, Timeline, Title } from "@mantine/core";
import {
  IconGitBranch,
  IconGitCommit,
  IconGitPullRequest,
  IconMessageDots,
} from "@tabler/icons";
import React from "react";
import { Person } from "../../../Client/Person";
import { PersonCard } from "../People/Person/PersonCard";

function RoleHome() {
  const person: Person = {
    id: 1,
    first_name: "James",
    last_name: "Bond",
  };
  return (
    <div>
      <Title order={3}>Role: Senior Software Engineer [FAKE]</Title>
      <br />
      <Grid>
        <Grid.Col span={4}>
          <PersonCard person={person} />
        </Grid.Col>
        <Grid.Col span={8}>
          <Title order={5}>Assignments</Title>
          <ul>
            <li>Member of Checkout Squad</li>
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
    </div>
  );
}

export default RoleHome;
