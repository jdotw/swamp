import { ConfirmModal } from "@/Components/ConfirmModal/ConfirmModal";
import { RoleType } from "@/Utils/trpc";

export interface DeleteRoleTypeConfirmModalProps {
  roleType?: RoleType;
  opened: boolean;
  onConfirm: (roleType?: RoleType) => void;
  onCancel: () => void;
}

export function DeleteRoleTypeConfirmModal({
  roleType,
  opened,
  onConfirm,
  onCancel,
}: DeleteRoleTypeConfirmModalProps) {
  return (
    <ConfirmModal
      title={`Delete ${roleType?.name} Role Type?`}
      description={`Are you sure you want to delete the Role Type ${roleType?.name}?`}
      opened={opened}
      onConfirm={() => onConfirm(roleType)}
      onCancel={onCancel}
    />
  );
}
