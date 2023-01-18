import { Button, ScrollArea, Table } from "@mantine/core";
import { useState } from "react";
import { MutateTeam, Team, useTeam } from "../../Client/Team";
import Loading from "../../Loading/Loading";
import MutateTeamModal from "./MutateTeamModal";
import { MutateTeamModalMode } from "./MutateTeamModal";

function TeamList() {
  const { loading, items, createItem, updateItem } = useTeam();
  const [mutateTeamModalOpen, setMutateTeamModalOpen] = useState(false);
  const [mutateTeamModalMode, setMutateTeamModalMode] = useState(
    MutateTeamModalMode.Create
  );
  const [teamBeingEdited, setTeamBeingEdited] = useState<Team>();
  const teamRows = items.map((team) => (
    <tr key={team.id}>
      <td>{team.name}</td>
    </tr>
  ));

  if (loading) {
    return <Loading />;
  }

  const onMutateTeamSubmit = async (mutatedTeam: MutateTeam) => {
    if (mutateTeamModalMode === MutateTeamModalMode.Create) {
      console.log("CREATE: ", mutatedTeam);
      createItem(mutatedTeam);
    } else if (mutateTeamModalMode === MutateTeamModalMode.Edit) {
      console.log("EDIT: ", mutatedTeam);
      if (teamBeingEdited) {
        updateItem(teamBeingEdited.id, mutatedTeam);
      }
    }
    setMutateTeamModalOpen(false);
  };

  return (
    <>
      <div>
        <title>Teamanisation Units</title>
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
        onSubmit={onMutateTeamSubmit}
      />
    </>
  );
}

export default TeamList;
