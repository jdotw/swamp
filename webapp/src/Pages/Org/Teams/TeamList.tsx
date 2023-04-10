import { Text, Button, ScrollArea, Table, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Team, MutateTeam, useTeam } from "../../../Client/Team";
import Loading from "../../../Components/Loading/Loading";
import MutateTeamModal from "./MutateTeamModal";

function TeamList() {
  const { items, loading, createItem, updateItem } = useTeam();
  const [mutateTeamModalOpen, setMutateTeamModalOpen] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState<Team>();
  const teamRows = items.map((team) => (
    <tr key={team.id}>
      <td>
        <Link to={team.id.toString()}>{team.name}</Link>
      </td>
    </tr>
  ));

  if (loading) {
    return <Loading />;
  }

  const onMutateTeamSubmit = async (mutatedTeam: MutateTeam) => {
    if (teamToEdit) {
      updateItem(teamToEdit.id, mutatedTeam);
    } else {
      createItem(mutatedTeam);
    }
    setMutateTeamModalOpen(false);
  };

  const teamRow = (team: Team, level: number) => (
    <tr key={team.id.toString()}>
      <td>
        <Link style={{ marginLeft: level * 20 }} to={team.id.toString()}>
          {team.name}
        </Link>
      </td>
      <td><Button onClick={() => { setTeamToEdit(team); setMutateTeamModalOpen(true); }}>Edit</Button></td>
    </tr>
  );

  const teamElements = (parent?: Team, level = 0) =>
    items.reduce((acc, team) => {
      if (team.parent_id == parent?.id) {
        acc.push(teamRow(team, level));
        acc.push(...teamElements(team, level + 1));
      }
      return acc;
    }, [] as JSX.Element[]);

  return (
    <>
      <div>
        <Title>Teams</Title>
        <Text>This is the complete list of all teams, regardless of type, defined in the organisation.</Text>
        <ScrollArea>
          <Table verticalSpacing="xs" data-testid={"teams-table"}>
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{teamElements()}</tbody>
          </Table>
        </ScrollArea>
        <Button
          data-testid={"add-team-button"}
          onClick={() => { setTeamToEdit(undefined); setMutateTeamModalOpen(true)}}
        >
          Add Team
        </Button>
      </div>
      <MutateTeamModal
        parentCandidates={items}
        opened={mutateTeamModalOpen}
        mode={teamToEdit ? "edit" : "create" }
        team={teamToEdit}
        onClose={() => setMutateTeamModalOpen(false)}
        onSubmit={onMutateTeamSubmit}
      />
    </>
  );
}

export default TeamList;
