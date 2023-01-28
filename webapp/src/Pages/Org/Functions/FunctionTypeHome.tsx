import { Table, Title } from "@mantine/core";
import React from "react";

function FunctionHome() {
  return (
    <div>
      <Title order={3}>Function: Manager</Title>
      <br />
      <Title order={4}>Roles</Title>
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

export default FunctionHome;
