import {
  Checkbox,
  createStyles,
  Flex,
  Text,
  Select,
  Table,
  Title,
} from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  checkboxTitleBox: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    paddingTop: 10,
    borderBottom: "1px solid #00000040",
  },
  checkboxInTitle: {
    marginRight: 10,
    display: "flex",
    alignItems: "center",
  },
  titleWithCheckbox: {},
}));

const allowedFunctions = () => (
  <Select
    key="role_type"
    placeholder="select duty type"
    defaultValue={"1"}
    data={[
      { value: "1", label: "None" },
      { value: "2", label: "Member" },
      { value: "3", label: "Manager" },
    ]}
  />
);

function RoleHome() {
  const { classes, theme } = useStyles();

  return (
    <div>
      <Title order={3}>Role Type: Software Engineer</Title>
      <Text>Parent Role: Engineering</Text>
      <br />
      <Title order={4}>Level Composition</Title>
      <Table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Vacant</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Senior</td>
            <td>3</td>
            <td>233</td>
          </tr>
          <tr>
            <td>Mid</td>
            <td>4</td>
            <td>33</td>
          </tr>
          <tr>
            <td>Junior</td>
            <td>1</td>
            <td>20</td>
          </tr>
        </tbody>
      </Table>
      <br />
      <Title order={4}>Active Roles</Title>
      <Table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Delivery</th>
            <th>Capability</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Senior</td>
            <td>Squirrel Burp Squad</td>
            <td>Data Engineering Chapter</td>
            <td>3 years</td>
          </tr>
          <tr>
            <td>Senior</td>
            <td>Malarkey Monday Squad</td>
            <td>Front-End Engineering Chapter</td>
            <td>3 years</td>
          </tr>
          <tr>
            <td>Senior</td>
            <td>Who What Where Squad</td>
            <td>Back-End Engineering Chapter</td>
            <td>3 years</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default RoleHome;
