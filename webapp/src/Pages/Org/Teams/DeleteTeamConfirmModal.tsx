import { Team } from "@/Client/Team";
import { ConfirmModal } from "@/Components/ConfirmModal/ConfirmModal";

export interface DeleteTeamConfirmModalProps {
  team?: Team;
  opened: boolean;
  onConfirm: (team?: Team) => void;
  onCancel: () => void;
}

export function DeleteTeamConfirmModal({
  team,
  opened,
  onConfirm,
  onCancel,
}: DeleteTeamConfirmModalProps) {
  return (
    <ConfirmModal
      title={`Disband ${team?.name} Team?`}
      description={`Are you sure you want to disband the team ${team?.name}?`}
      opened={opened}
      onConfirm={() => onConfirm(team)}
      onCancel={onCancel}
    />
  );
}

