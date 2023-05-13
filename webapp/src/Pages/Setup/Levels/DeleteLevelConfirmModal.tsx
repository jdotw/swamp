import { Level } from "@/Client/Level";
import { ConfirmModal } from "@/Components/ConfirmModal/ConfirmModal";

export interface DeleteLevelConfirmModalProps {
  level?: Level;
  opened: boolean;
  onConfirm: (level?: Level) => void;
  onCancel: () => void;
}

export function DeleteLevelConfirmModal({
  level,
  opened,
  onConfirm,
  onCancel,
}: DeleteLevelConfirmModalProps) {
  return (
    <ConfirmModal
      title={`Delete ${level?.name} Level?`}
      description={`Are you sure you want to delete the level ${level?.name}?`}
      opened={opened}
      onConfirm={() => onConfirm(level)}
      onCancel={onCancel}
    />
  );
}

