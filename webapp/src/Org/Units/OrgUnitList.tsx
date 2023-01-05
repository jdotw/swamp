import { ScrollArea, Table } from "@mantine/core";
import React from "react";

function OrgUnitList() {
  return (
    <div>
      <title>Organisation Units</title>
      <ScrollArea>
        <Table verticalSpacing="xs">
          <thead>
            <tr>
              <th>Name</th>
              <th>Parent</th>
            </tr>
          </thead>
          {/* <tbody>{rows}</tbody> */}
        </Table>
      </ScrollArea>
    </div>
  );
}

export default OrgUnitList;
