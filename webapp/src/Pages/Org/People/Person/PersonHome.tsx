import {
  Accordion,
  Avatar,
  Grid,
  Group,
  ScrollArea,
  Table,
  Title,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  usePerson,
  Person as PersonType,
  MutatePerson,
} from "../../../../Client/Person";
import { useRoleAssignment } from "../../../../Client/RoleAssignment";
import Loading from "../../../../Components/Loading/Loading";
import { timeSinceDateString } from "../../../../Utils/TimeSinceDate";
import { MutatePersonModal } from "../MutatePersonModal";
import { PersonCard } from "./PersonCard";

function PersonHome() {
  const id = +useParams().personId!;
  const { items, loading, updateItem } = usePerson({
    id,
  });
  const { items: roleAssignments, loading: loadingRoleAssignments } =
    useRoleAssignment({ personId: id });

  const [editModalOpened, setEditModalOpened] = useState(false);

  if (loading || loadingRoleAssignments) {
    return <Loading />;
  }

  if (!id || items.length < 1) {
    return <div>Person not found</div>;
  }

  const person = items[0];

  const onEditSubmit = async (updatedPerson: MutatePerson) => {
    await updateItem(id, updatedPerson);
    setEditModalOpened(false);
  };

  const onEditClicked = () => {
    setEditModalOpened(true);
  };

  const roleHistoryContent = [
    {
      id: 1,
      roleType: "Software Engineer",
      currentLevel: "Senior",
      activeDeliveryUnit: "Pixel Stardust Squad",
      activeCapabilityUnit: "Front-End Engineering Chapter",
      timeInRole: "1 year",
      levelHistory: (
        <>
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Level</th>
                <th>Start Date</th>
                <th>Time in Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Software Engineer</td>
                <td>Senior</td>
                <td>2021-01-01</td>
                <td>1 year</td>
              </tr>
              <tr>
                <td>Software Engineer</td>
                <td>Senior</td>
                <td>2021-01-01</td>
                <td>1 year</td>
              </tr>
            </tbody>
          </Table>
        </>
      ),
      assignmentHistory: (
        <>
          <Table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Unit</th>
                <th>Function</th>
                <th>Start Date</th>
                <th>Time in Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Squad</td>
                <td>Pixel Stardust</td>
                <td>Member</td>
                <td>2023-01-01</td>
                <td>1 month</td>
              </tr>
              <tr>
                <td>Chapter</td>
                <td>Front-End Engineering</td>
                <td>Manager</td>
                <td>2022-01-01</td>
                <td>1 year</td>
              </tr>
            </tbody>
          </Table>
        </>
      ),
    },
    {
      id: 2,
      roleType: "Software Engineer",
      currentLevel: "Associate",
      activeDeliveryUnit: "Unicorn Fluffery Squad",
      activeCapabilityUnit: "Backend-End Engineering Chapter",
      timeInRole: "2 year",
      levelHistory: (
        <>
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Level</th>
                <th>Start Date</th>
                <th>Time in Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Software Engineer</td>
                <td>Associate</td>
                <td>2019-01-01</td>
                <td>2 year</td>
              </tr>
            </tbody>
          </Table>
        </>
      ),
      assignmentHistory: (
        <>
          <Table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Unit</th>
                <th>Function</th>
                <th>Start Date</th>
                <th>Time in Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Squad</td>
                <td>Unicorn Fluffery</td>
                <td>Member</td>
                <td>2019-01-01</td>
                <td>2 month</td>
              </tr>
              <tr>
                <td>Chapter</td>
                <td>Backend-End Engineering</td>
                <td>Member</td>
                <td>2019-01-01</td>
                <td>2 year</td>
              </tr>
            </tbody>
          </Table>
        </>
      ),
    },
  ];

  interface AccordionLabelProps {
    label: string;
    image: string;
    description: string;
    item: any;
  }

  function AccordionLabel({
    item,
    label,
    image,
    description,
  }: AccordionLabelProps) {
    return (
      <Group noWrap>
        <div>
          <Text>{item.currentLevel + " " + item.roleType}</Text>
          <Text size="sm" color="dimmed" weight={400}></Text>
          <Text size="sm" color="dimmed" weight={400}>
            {item.activeDeliveryUnit} &bull; {item.activeCapabilityUnit} &bull;
            {item.timeInRole}
          </Text>
        </div>
      </Group>
    );
  }

  const roleItems = roleHistoryContent.map((item, index) => (
    <Accordion.Item value={item.id.toString()} key={item.label}>
      <Accordion.Control>
        <AccordionLabel item={item} {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text>Levels</Text>
        {item.levelHistory}
        <br />
        <Text>Assignments</Text>
        {item.assignmentHistory}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <>
      <div>
        <Grid>
          <Grid.Col span={4}>
            <PersonCard person={person} onEditClicked={onEditClicked} />
          </Grid.Col>
          <Grid.Col span={8}>
            {/* <Title order={3}>Current Role</Title>
            <ul>
              <li>Title: Software Engineer</li>
              <li>Level: Senior</li>
            </ul>
            <Title order={5}>Functions</Title>
            <ul>
              <li>Member: Checkout Squad</li>
              <li>Manager: Front-End Engineering Chapter</li>
            </ul> */}
          </Grid.Col>
        </Grid>
        <hr />
        <Title order={3}>Role History</Title>
        <Accordion
          multiple={true}
          chevronPosition="right"
          variant="contained"
          defaultValue={[roleHistoryContent[0].id.toString()]}
        >
          {roleItems}
        </Accordion>
      </div>
      <MutatePersonModal
        title={"Edit Person"}
        mode={"edit"}
        opened={editModalOpened}
        person={person}
        onSubmit={onEditSubmit}
        onClose={() => setEditModalOpened(false)}
      />
    </>
  );
}

export default PersonHome;
