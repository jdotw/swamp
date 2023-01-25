import { Table, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

function RolesList() {
  return (
    <div>
      <Title order={3}>Roles</Title>
      <br />
      <Title order={4}>Active Roles</Title>
      <Table>
        <thead>
          <tr>
            <th>Role Type</th>
            <th>Delivery Unit</th>
            <th>Capability</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Software Engineer</td>
            <td>Squirrel Burp Squad</td>
            <td>Data Engineering Chapter</td>
            <td>3 years</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default RolesList;
