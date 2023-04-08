import React from "react";
import { Title, Text } from "@mantine/core";

function Home() {
  return (
  <div>
    <div>
      <Title order={2}>My Role</Title>
      <Text>Title: Senior Software Engineer</Text> 
    </div>
    <div>
      <Title order={2}>My Capabilities</Title>
      <table>
        <thead>
          <th>Capability</th>
          <th>Home</th>
          <th>Delivery</th>
        </thead>
        <tbody>
          <tr>
            <td>React Engineer</td>
            <td>Web Chapter</td>
            <td>Cart Squad</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <Title order={2}>My Teams</Title>
      <table>
        <thead>
          <th>Team</th>
          <th>Assignment</th>
        </thead>
        <tbody>
          <tr>
            <td>Web Chapter</td>
            <td>React Engineer</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>);
}

export default Home;
