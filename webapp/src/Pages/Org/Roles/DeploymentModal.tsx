import { Select } from "@mantine/core";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import Loading from "../../../Components/Loading/Loading";
import { Capability } from "../../../Client/Capabilities";
import { useTeam } from "../../../Client/Team";
import { MutateDeployment } from "../../../Client/Deployments";

export interface DeploymentModalProps {
  capability: Capability;
  opened: boolean;
  onSubmit: (deployment: MutateDeployment) => void;
  onClose: () => void;
}

export function DeploymentModal({
  capability,
  opened,
  onSubmit,
  onClose,
}: DeploymentModalProps) {
  const { items: teams, loading: loadingTeams } = useTeam({ type: "delivery" });

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
    let deployment: MutateDeployment = {
      team_id: parseInt(values.team_id),
      capability_id: capability.id,
    };
    onSubmit(deployment);
  };

  return (
    <MutateItemModal
      mode={"create"}
      fields={fields}
      opened={opened}
      onSubmit={submitFormValues}
      onClose={onClose}
      title={"Deploy Capability"}
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
