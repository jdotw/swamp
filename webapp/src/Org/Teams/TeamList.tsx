import { Button, ScrollArea, Table } from "@mantine/core";
import { useState } from "react";
import { MutateOrg, Org, useOrg } from "../../Client/Team";
import Loading from "../../Loading/Loading";
import MutateTeamModal from "./MutateTeamModal";
import { MutateTeamModalMode } from "./MutateTeamModal";

function TeamList() {
  const { loading, items, createItem, updateItem } = useOrg();
  const [mutateTeamModalOpen, setMutateTeamModalOpen] = useState(false);
  const [mutateTeamModalMode, setMutateTeamModalMode] = useState(
    MutateTeamModalMode.Create
  );
  const [teamBeingEdited, setOrgBeingEdited] = useState<Org>();
  const teamRows = items.map((team) => (
    <tr key={team.id}>
      <td>{team.name}</td>
    </tr>
  ));

  if (loading) {
    return <Loading />;
  }

  const onMutateOrgSubmit = async (mutatedOrg: MutateOrg) => {
    if (mutateTeamModalMode === MutateTeamModalMode.Create) {
      console.log("CREATE: ", mutatedOrg);
      createItem(mutatedOrg);
    } else if (mutateTeamModalMode === MutateTeamModalMode.Edit) {
      console.log("EDIT: ", mutatedOrg);
      if (teamBeingEdited) {
        updateItem(teamBeingEdited.id, mutatedOrg);
      }
    }
    setMutateTeamModalOpen(false);
  };

  return (
    <>
      <div>
        <title>Organisation Units</title>
        <ScrollArea>
          <Table verticalSpacing="xs" data-testid={"teams-table"}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Parent</th>
              </tr>
            </thead>
            <tbody>{teamRows}</tbody>
          </Table>
        </ScrollArea>
        <Button
          data-testid={"add-team-button"}
          onClick={() => setMutateTeamModalOpen(true)}
        >
          Add Team
        </Button>
      </div>
      <MutateTeamModal
        opened={mutateTeamModalOpen}
        mode={mutateTeamModalMode}
        onClose={() => setMutateTeamModalOpen(false)}
        onSubmit={onMutateOrgSubmit}
      />
    </>
  );
}

export default TeamList;
