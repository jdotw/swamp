import { Track } from "@/Client/Track";
import { ConfirmModal } from "@/Components/ConfirmModal/ConfirmModal";

export interface DeleteTrackConfirmModalProps {
  track?: Track;
  opened: boolean;
  onConfirm: (track?: Track) => void;
  onCancel: () => void;
}

export function DeleteTrackConfirmModal({
  track,
  opened,
  onConfirm,
  onCancel,
}: DeleteTrackConfirmModalProps) {
  return (
    <ConfirmModal
      title={`Delete ${track?.name}?`}
      description={`Are you sure you want to delete career track ${track?.name}?`}
      opened={opened}
      onConfirm={() => onConfirm(track)}
      onCancel={onCancel}
    />
  );
}

