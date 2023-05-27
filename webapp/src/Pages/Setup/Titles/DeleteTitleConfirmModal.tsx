import { ConfirmModal } from "@/Components/ConfirmModal/ConfirmModal";
import { Title } from "@/Utils/trpc";

export interface DeleteTitleConfirmModalProps {
  title?: Title;
  opened: boolean;
  onConfirm: (title?: Title) => void;
  onCancel: () => void;
}

export function DeleteTitleConfirmModal({
  title,
  opened,
  onConfirm,
  onCancel,
}: DeleteTitleConfirmModalProps) {
  return (
    <ConfirmModal
      title={`Retire ${title?.name} Title?`}
      description={`Are you sure you want to retire the title ${title?.name}?`}
      opened={opened}
      onConfirm={() => onConfirm(title)}
      onCancel={onCancel}
    />
  );
}
