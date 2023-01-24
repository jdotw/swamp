import { ScrollArea, Table, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

function RolesList() {
  return (
    <div>
      <Title order={3}>Role Types</Title>
      <ScrollArea>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Vacant</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to={"3"}>Software Engineer</Link>
              </td>
              <td>3</td>
              <td>233</td>
            </tr>
            <tr>
              <td>
                <Link to={"3"}>Quality Engineer</Link>
              </td>
              <td>4</td>
              <td>33</td>
            </tr>
            <tr>
              <td>
                <Link to={"3"}>Infrastructure Engineer</Link>
              </td>
              <td>1</td>
              <td>20</td>
            </tr>
            <tr>
              <td>
                <Link to={"3"}>Engineering Manager</Link>
              </td>
              <td>0</td>
              <td>10</td>
            </tr>
            <tr>
              <td>
                <Link to={"3"}>Product Manager</Link>
              </td>
              <td>3</td>
              <td>8</td>
            </tr>
            <tr>
              <td>
                <Link to={"3"}>Product Designer</Link>
              </td>
              <td>6</td>
              <td>12</td>
            </tr>
            <tr>
              <td>
                <Link to={"3"}>Technology Leadership</Link>
              </td>
              <td>4</td>
              <td>1</td>
            </tr>
            <tr>
              <td>
                <Link to={"3"}>Engineering Leadership</Link>
              </td>
              <td>4</td>
              <td>1</td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>
    </div>
  );
}

export default RolesList;
