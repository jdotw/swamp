import { Select } from "@mantine/core";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import Loading from "../../../Components/Loading/Loading";
import { useTeam } from "../../../Client/Team";
import { MutateDeployment } from "../../../Client/Deployments";
import { Capability } from "@/Client/Capability";
import { useDeploymentType } from "@/Client/DeploymentTypes";

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
  const { items: deploymentTypes, loading: loadingDeploymentTypes } = useDeploymentType();

  if (loadingTeams || loadingDeploymentTypes) {
    return <Loading />;
  }

  const fields: MutateItemModalFormField[] = [
    {
      key: "team_id",
      validation: (value) => nonEmptyString(value, "Team must be selected"),
    },
    {
      key: "deployment_type_id",
      validation: (value) => nonEmptyString(value, "Type must be selected"),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    const deployment: MutateDeployment = {
      deployment_type_id: parseInt(values.deployment_type_id),
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
        withAsterisk
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
      <Select
        withAsterisk
        key="deployment_type_id"
        label="Deployment Type"
        placeholder="select type"
        data={deploymentTypes.map((deploymentType) => {
          return {
            value: deploymentType.id.toString(),
            label: deploymentType.name,
          };
        })}
      />
    </MutateItemModal>
  );
}
