import { Select } from "@mantine/core";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import Loading from "../../../Components/Loading/Loading";
import { MutateHomeAssignment } from "../../../Client/HomeAssignment";
import { Capability } from "../../../Client/Capabilities";
import { useTeam } from "../../../Client/Team";

export interface AssignHomeTeamModalProps {
  capability: Capability;
  opened: boolean;
  onSubmit: (homeAssignment: MutateHomeAssignment) => void;
  onClose: () => void;
}

export function AssignHomeTeamModal({
  capability,
  opened,
  onSubmit,
  onClose,
}: AssignHomeTeamModalProps) {
  const { items: teams, loading: loadingTeams } = useTeam();

  if (loadingTeams) {
    return <Loading />;
  }

  const fields: MutateItemModalFormField[] = [
    {
      key: "team_id",
      initialValue: "",
      validation: (value) => nonEmptyString(value, "Team must be selected"),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    let homeAssignment: MutateHomeAssignment = {
      team_id: parseInt(values.team_id),
      capability_id: capability.id,
    };
    onSubmit(homeAssignment);
  };

  return (
    <MutateItemModal
      mode={"create"}
      fields={fields}
      opened={opened}
      onSubmit={submitFormValues}
      onClose={onClose}
      title={"Assign Home Team"}
    >
      <Select
        key="team_id"
        label="Team"
        placeholder="select team"
        data={teams.map((team) => {
          return {
            value: team.id.toString(),
            label: team.name,
          };
        })}
      />
    </MutateItemModal>
  );
}
