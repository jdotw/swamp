import { Accordion, Grid, Group, Table, Title, Text } from "@mantine/core";
import { useState } from "react";
import { useParams } from "react-router";
import { usePerson, MutatePerson } from "../../../../Client/Person";
import { RoleAssignment, useRoleAssignment } from "../../../../Client/RoleAssignment";
import Loading from "../../../../Components/Loading/Loading";
import { MutatePersonModal } from "../MutatePersonModal";
import { PersonCard } from "./PersonCard";
import { LevelAssignment } from "@/Client/Role";

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

  const roleHistoryLevelTable = (levelAssignments?: LevelAssignment[]) => {
    return (
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
    )
  };


  const roleHistoryContent = (roleAssignments: RoleAssignment[]) => {
    return roleAssignments.map((item) => ({
      id: 1,
      roleType: item.role.role_type?.name ?? "",
      currentLevel: item.role.active_level_assignment.level?.individual_contributor_title ?? "",
      levelHistory: roleHistoryLevelTable(item.role.level_assignments),
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
    })
    )
  };

  interface AccordionLabelProps {
    item: any;
  }

  function AccordionLabel({ item }: AccordionLabelProps) {
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


  const roleHistoryAccordion = (roleAssignments: RoleAssignment[]) => {
    const content = roleHistoryContent(roleAssignments);
    return (<Accordion
      multiple={true}
      chevronPosition="right"
      variant="contained"
      defaultValue={[content[0].id.toString()]}
    >
      {content.map((item) => (
        <Accordion.Item value={item.id.toString()} key={item.id}>
          <Accordion.Control>
            <AccordionLabel item={item} />
          </Accordion.Control>
          <Accordion.Panel>
            <Text>Levels</Text>
            {item.levelHistory}
            <br />
            <Text>Assignments</Text>
            {item.assignmentHistory}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>)
  }

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
        {roleHistoryAccordion(roleAssignments)}
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
