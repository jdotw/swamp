import { Table, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

function LevelHome() {
  return (
    <div>
      <Title order={3}>Level: Senior</Title>
      <br />
      <Title order={4}>Role Composition</Title>
      <Table>
        <thead>
          <tr>
            <th>Role Type</th>
            <th>Vacant</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link to={"3"}>Senior Engineering</Link>
            </td>
            <td>3</td>
            <td>233</td>
          </tr>
          <tr>
            <td>
              <Link to={"3"}>
                &nbsp;&nbsp;&nbsp;&nbsp;Senior Software Engineer
              </Link>
            </td>
            <td>3</td>
            <td>233</td>
          </tr>
          <tr>
            <td>
              <Link to={"3"}>
                &nbsp;&nbsp;&nbsp;&nbsp;Senior Quality Engineer
              </Link>
            </td>
            <td>4</td>
            <td>33</td>
          </tr>
          <tr>
            <td>
              <Link to={"3"}>
                &nbsp;&nbsp;&nbsp;&nbsp;Senior Infrastructure Engineer
              </Link>
            </td>
            <td>1</td>
            <td>20</td>
          </tr>
          <tr>
            <td>
              <Link to={"3"}>
                &nbsp;&nbsp;&nbsp;&nbsp;Senior Engineering Manager
              </Link>
            </td>
            <td>0</td>
            <td>10</td>
          </tr>
          <tr>
            <td>
              <Link to={"3"}>Senior Product</Link>
            </td>
            <td>3</td>
            <td>8</td>
          </tr>
          <tr>
            <td>
              <Link to={"3"}>
                &nbsp;&nbsp;&nbsp;&nbsp;Senior Product Manager
              </Link>
            </td>
            <td>3</td>
            <td>8</td>
          </tr>
          <tr>
            <td>
              <Link to={"3"}>
                &nbsp;&nbsp;&nbsp;&nbsp;Senior Product Designer
              </Link>
            </td>
            <td>6</td>
            <td>12</td>
          </tr>
          <tr>
            <td>
              <Link to={"3"}>Senior Technology</Link>
            </td>
            <td>4</td>
            <td>1</td>
          </tr>
        </tbody>
      </Table>
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

export default LevelHome;
