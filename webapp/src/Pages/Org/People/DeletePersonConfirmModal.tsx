import { ConfirmModal } from "@/Components/ConfirmModal/ConfirmModal";
import { Person } from "@/Utils/trpc";

export interface DeletePersonConfirmModalProps {
  person?: Person;
  opened: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeletePersonConfirmModal({
  person,
  opened,
  onConfirm,
  onCancel,
}: DeletePersonConfirmModalProps) {
  return (
    <ConfirmModal
      title={`Delete ${person?.first_name} ${person?.last_name}?`}
      description={`Are you sure you want to delete ${person?.first_name} ${person?.last_name}?`}
      opened={opened}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
