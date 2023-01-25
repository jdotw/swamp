import { Table, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

function FunctionList() {
  return (
    <div>
      <Title order={3}>Functions</Title>
      <Table>
        <thead>
          <tr>
            <th>Function</th>
            <th>Roles</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link to={"1"}>Member (Contributor)</Link>
            </td>
            <td>620</td>
            <td>62%</td>
          </tr>
          <tr>
            <td>
              <Link to={"2"}>Manager</Link>
            </td>
            <td>380</td>
            <td>38%</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default FunctionList;
