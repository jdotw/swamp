import { ScrollArea, Select, Table, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

function LevelList() {
  return (
    <div>
      <Title order={3}>Levels</Title>
      <ScrollArea>
        <Table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Individual Contributor</th>
              <th>Management</th>
              <th>External ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <Link to={"3"}>Graduate</Link>
              </td>
              <td></td>
              <td>1</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <Link to={"3"}>Associate</Link>
              </td>
              <td></td>
              <td>2</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <Link to={"3"}>Senior</Link>
              </td>
              <td>
                <Link to={"3"}>Manager</Link>
              </td>
              <td>3</td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                <Link to={"3"}>Principal</Link>
              </td>
              <td>
                <Link to={"3"}>Senior Manager</Link>
              </td>
              <td>4</td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                <Link to={"3"}>Chief</Link>
              </td>
              <td>
                <Link to={"3"}>Head Of</Link>
              </td>
              <td>5</td>
            </tr>
            <tr>
              <td>6</td>
              <td>
                <Link to={"3"}>Distinguished</Link>
              </td>
              <td>
                <Link to={"3"}>General Manager</Link>
              </td>
              <td>6</td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>
    </div>
  );
}

export default LevelList;
