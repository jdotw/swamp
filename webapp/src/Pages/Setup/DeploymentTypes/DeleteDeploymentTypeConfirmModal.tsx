import { DeploymentType } from "@/Client/DeploymentTypes";
import { ConfirmModal } from "@/Components/ConfirmModal/ConfirmModal";

export interface DeleteDeploymentTypeConfirmModalProps {
  deploymentType?: DeploymentType;
  opened: boolean;
  onConfirm: (deploymentType?: DeploymentType) => void;
  onCancel: () => void;
}

export function DeleteDeploymentTypeConfirmModal({
  deploymentType,
  opened,
  onConfirm,
  onCancel,
}: DeleteDeploymentTypeConfirmModalProps) {
  return (
    <ConfirmModal
      title={`Delete ${deploymentType?.name} Deployment Type?`}
      description={`Are you sure you want to delete the Deployment Type ${deploymentType?.name}?`}
      opened={opened}
      onConfirm={() => onConfirm(deploymentType)}
      onCancel={onCancel}
    />
  );
}
