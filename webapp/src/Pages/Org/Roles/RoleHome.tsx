import {
  Checkbox,
  createStyles,
  Flex,
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
      <hr />

      {/* <Title order={4}>Default Functions</Title>
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Member</td>
            <td>Squad</td>
          </tr>
          <tr>
            <td>Member</td>
            <td>Chapter</td>
          </tr>
        </tbody>
      </Table>
      <hr />
      <Title order={4}>Levels</Title>
      <div className={classes.checkboxTitleBox}>
        <Checkbox className={classes.checkboxInTitle} />
        <Title className={classes.titleWithCheckbox} order={4}>
          Senior
        </Title>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Manager</td>
            <td>Chapter</td>
          </tr>
        </tbody>
      </Table>
      <Title order={4}>
        <div className={classes.checkboxTitleBox}>
          <Checkbox className={classes.checkboxInTitle} />
          Principal
        </div>
      </Title>
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Manager</td>
            <td>Squad</td>
          </tr>
        </tbody>
      </Table> */}
    </div>
  );
}

export default RoleHome;
