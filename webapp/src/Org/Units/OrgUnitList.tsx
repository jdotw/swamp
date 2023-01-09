import { Button, ScrollArea, Table } from "@mantine/core";
import { useState } from "react";
import { useOrg } from "../../Client/Org";
import Loading from "../../Loading/Loading";
import MutateOrgUnitModal from "./MutateOrgUnitModal";
import { MutateOrgUnitModalMode } from "./MutateOrgUnitModal";

function OrgUnitList() {
  const { loading, items } = useOrg();
  const [mutateOrgUnitModalOpen, setMutateOrgUnitModalOpen] = useState(false);
  const [mutateOrgUnitModalMode, setMutateOrgUnitModalMode] = useState(
    MutateOrgUnitModalMode.Create
  );
  const orgRows = items.map((org) => (
    <tr key={org.id}>
      <td>{org.name}</td>
    </tr>
  ));

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <title>Organisation Units</title>
        <ScrollArea>
          <Table verticalSpacing="xs" data-testid={"org-units-table"}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Parent</th>
              </tr>
            </thead>
            <tbody>{orgRows}</tbody>
          </Table>
        </ScrollArea>
        <Button
          data-testid={"add-org-unit-button"}
          onClick={() => setMutateOrgUnitModalOpen(true)}
        >
          Add Org Unit
        </Button>
      </div>
      <MutateOrgUnitModal opened={mutateOrgUnitModalOpen} />
    </>
  );
}

export default OrgUnitList;
