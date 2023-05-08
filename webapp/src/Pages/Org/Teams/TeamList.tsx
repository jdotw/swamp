import { Text, Button, ScrollArea, Table, Title, createStyles } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Team, MutateTeam, useTeam } from "../../../Client/Team";
import Loading from "../../../Components/Loading/Loading";
import MutateTeamModal from "./MutateTeamModal";
import { DeleteTeamConfirmModal } from "./DeleteTeamConfirmModal";

const useStyles = createStyles(() => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  rowButtonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  vacantRole: {
    backgroundColor: "#ff000040",
  },
  filledRole: {},
  disbandedTeam: {
    color: "gray",
  }
}));

function TeamList() {
  const { classes } = useStyles();
  const { items, loading, createItem, updateItem } = useTeam();
  const [selectedTeam, setSelectedTeam] = useState<Team>();
  const [mutateTeamModalOpen, setMutateTeamModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const onMutateTeamSubmit = async (mutatedTeam: MutateTeam) => {
    if (selectedTeam) {
      updateItem(selectedTeam.id, mutatedTeam);
    } else {
      createItem(mutatedTeam);
    }
    setMutateTeamModalOpen(false);
  };

  const deleteClicked = (team: Team) => {
    setSelectedTeam(team);
    setDeleteModalOpen(true);
  }

  const deleteConfirmed = async (team?: Team) => {
    if (team) {
      await updateItem(team.id, {
        name: team.name,
        description: team.description,
        type: team.type,
        parent_id: team.parent_id,
        formed_at_date: team.formed_at_date,
        disbanded_at_date: new Date().toISOString()
      });
    }
    setDeleteModalOpen(false);
  }

  const teamRow = (team: Team, level: number) => (
    <tr key={team.id.toString()}>
      <td>
        <Link style={{ marginLeft: level * 20 }} className={team.disbanded_at_date ? classes.disbandedTeam : ""} to={team.id.toString()}>
          {team.name} {team.disbanded_at_date && "(disbanded)"}
        </Link>
      </td>
      <td>
        {!team.disbanded_at_date && (
          <div className={classes.rowButtonBar}>
            <Button onClick={() => { setSelectedTeam(team); setMutateTeamModalOpen(true); }}>Edit</Button>
            <Button onClick={() => deleteClicked(team)}>Delete</Button>
          </div>
        )}
      </td>
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
          data-testid="add-team-button"
          onClick={() => { setSelectedTeam(undefined); setMutateTeamModalOpen(true) }}
        >
          Add Team
        </Button>
      </div>
      <MutateTeamModal
        parentCandidates={items}
        opened={mutateTeamModalOpen}
        mode={selectedTeam ? "edit" : "create"}
        team={selectedTeam}
        onClose={() => setMutateTeamModalOpen(false)}
        onSubmit={onMutateTeamSubmit}
      />
      <DeleteTeamConfirmModal
        opened={deleteModalOpen}
        team={selectedTeam}
        onConfirm={deleteConfirmed}
        onCancel={() => setDeleteModalOpen(false)} />
    </>
  );
}

export default TeamList;
