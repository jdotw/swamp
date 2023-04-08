import { Text, Button, ScrollArea, Table, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MutateTeam, useTeam } from "../../../Client/Team";
import Loading from "../../../Components/Loading/Loading";
import MutateTeamModal from "./MutateTeamModal";
import { MutateTeamModalMode } from "./MutateTeamModal";

interface Team {
  id: number;
  name: string;
  parent_id?: number;
}

const fakeData: Team[] = [
  {
    "id": 1,
    "name": "Backend Software Practice",
  },
  {
    id: 2,
    name: "C# Backend Chapter",
    parent_id: 1,
  },
  {
    id: 3,
    name: "Java Backend Chapter",
    parent_id: 1,
  },
  {
    id: 4,
    name: "Python Backend Chapter",
    parent_id: 1,
  },
  {
    id: 5,
    "name": "Frontend Software Practice",
  },
  {
    id: 6,
    name: "React Frontend Chapter",
    parent_id: 5,
  },
  {
    id: 7,
    name: "Angular Frontend Chapter",
    parent_id: 5,
  },
  {
    id: 8,
    name: "Vue Frontend Chapter",
    parent_id: 5,
  },
  {
    "id": 9,
    "name": "DevOps Practice",
  },
  {
    id: 10,
    name: "AWS DevOps Chapter",
    parent_id: 9,
  },
  {
    id: 11,
    name: "Azure DevOps Chapter",
    parent_id: 9,
  },
  {
    id: 12,
    name: "GCP DevOps Chapter",
    parent_id: 9,
  },
  {
    id: 101,
    name: "Storefronts Tribe",
  },
  {
    id: 102,
    name: "Fulfillment Tribe",
  },
  {
    id: 103,
    name: "Marketing Tribe",
  },
  {
    id: 104,
    name: "Loyalty Tribe",
  },
  {
    id: 105,
    name: "Ops Tribe",
  },
  {
    id: 106,
    name: "Flightdeck Tribe",
    parent_id: 105,
  },
  {
    id: 107,
    name: "SRE Squad",
    parent_id: 105,
  },
  {
    id: 108,
    name: "Product Pages Squad",
    parent_id: 101,
  },
  {
    id: 109,
    name: "Search Squad",
    parent_id: 101,
  },
  {
    id: 1010,
    name: "Checkout Squad",
    parent_id: 101,
  },
  {
    id: 1011,
    name: "Recipes Squad",
    parent_id: 101,
  },
  {
    id: 1012,
    name: "Order Management Squad",
    parent_id: 102,
  },
  {
    id: 1013,
    name: "Picking Squad",
    parent_id: 102,
  },
  {
    id: 1014,
    name: "Digital Media Squad",
    parent_id: 103,
  },
  {
    id: 1015,
    name: "Comms Squad",
    parent_id: 103,
  },
  {
    id: 1016,
    name: "Rewards Program Squad",
    parent_id: 104,
  },
  ];

function TeamList() {
  const { loading, createItem, updateItem } = useTeam();
  const items = fakeData;
  const [mutateTeamModalOpen, setMutateTeamModalOpen] = useState(false);
  const [mutateTeamModalMode, setMutateTeamModalMode] = useState(
    MutateTeamModalMode.Create
  );
  const [teamBeingEdited, setTeamBeingEdited] = useState<Team>();
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
    if (mutateTeamModalMode === MutateTeamModalMode.Create) {
      createItem(mutatedTeam);
    } else if (mutateTeamModalMode === MutateTeamModalMode.Edit) {
      if (teamBeingEdited) {
        updateItem(teamBeingEdited.id, mutatedTeam);
      }
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
              </tr>
            </thead>
            <tbody>{teamElements()}</tbody>
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
