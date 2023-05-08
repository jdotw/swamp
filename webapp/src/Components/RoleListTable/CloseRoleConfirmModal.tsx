import { Role } from "@/Client/Role";
import { ConfirmModal } from "@/Components/ConfirmModal/ConfirmModal";

export interface CloseRoleConfirmModalProps {
  role?: Role;
  opened: boolean;
  onConfirm: (role?: Role) => void;
  onCancel: () => void;
}

export function CloseRoleConfirmModal({
  role,
  opened,
  onConfirm,
  onCancel,
}: CloseRoleConfirmModalProps) {
  const roleDescription = `${role?.active_title_assignment?.title?.name} ${role?.role_type?.name}`;
  return (
    <ConfirmModal
      title={`Close ${roleDescription} Role?`}
      description={`Are you sure you want to close the role ${roleDescription}?`}
      opened={opened}
      onConfirm={() => onConfirm(role)}
      onCancel={onCancel}
    />
  );
}

