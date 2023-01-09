import { Button, ScrollArea, Table } from "@mantine/core";
import { useState } from "react";
import { MutateOrg, Org, useOrg } from "../../Client/Org";
import Loading from "../../Loading/Loading";
import MutateOrgUnitModal from "./MutateOrgUnitModal";
import { MutateOrgUnitModalMode } from "./MutateOrgUnitModal";

function OrgUnitList() {
  const { loading, items, createItem, updateItem } = useOrg();
  const [mutateOrgUnitModalOpen, setMutateOrgUnitModalOpen] = useState(false);
  const [mutateOrgUnitModalMode, setMutateOrgUnitModalMode] = useState(
    MutateOrgUnitModalMode.Create
  );
  const [orgBeingEdited, setOrgBeingEdited] = useState<Org>();
  const orgRows = items.map((org) => (
    <tr key={org.id}>
      <td>{org.name}</td>
    </tr>
  ));

  if (loading) {
    return <Loading />;
  }

  const onMutateOrgSubmit = async (mutatedOrg: MutateOrg) => {
    if (mutateOrgUnitModalMode === MutateOrgUnitModalMode.Create) {
      console.log("CREATE: ", mutatedOrg);
      createItem(mutatedOrg);
    } else if (mutateOrgUnitModalMode === MutateOrgUnitModalMode.Edit) {
      console.log("EDIT: ", mutatedOrg);
      if (orgBeingEdited) {
        updateItem(orgBeingEdited.id, mutatedOrg);
      }
    }
    setMutateOrgUnitModalOpen(false);
  };

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
      <MutateOrgUnitModal
        opened={mutateOrgUnitModalOpen}
        mode={mutateOrgUnitModalMode}
        onClose={() => setMutateOrgUnitModalOpen(false)}
        onSubmit={onMutateOrgSubmit}
      />
    </>
  );
}

export default OrgUnitList;
