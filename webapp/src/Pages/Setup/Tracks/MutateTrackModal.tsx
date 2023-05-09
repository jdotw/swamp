import {
  Select,
  SelectItem,
} from "@mantine/core";
import { TextInput } from "@mantine/core";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import { MutateTrack, Track } from "@/Client/Track";

export interface MutateTrackModalProps {
  track?: Track;
  parentCandidates?: Track[];
  opened: boolean;
  onSubmit: (track: MutateTrack) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
}

export function MutateTrackModal({
  track,
  parentCandidates,
  opened,
  onSubmit,
  onClose,
}: MutateTrackModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      validation: (value) => nonEmptyString(value, "Name is required"),
      value: track?.name ?? "",
    },
    {
      key: "parent_id",
      initialValue: "",
      value: track?.parent_id?.toString() ?? "",
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    const track: MutateTrack = {
      name: values.name,
      parent_id: parseInt(values.parent_id) ?? undefined,
    };
    onSubmit(track);
  };

  const parentTrackData = () =>
    (parentCandidates ?? []).map((track) => ({
      value: track.id.toString(),
      label: track.name,
    })) as SelectItem[];

  return (
    <MutateItemModal
      title={track ? "Edit Track" : "Add Track"}
      opened={opened}
      onClose={onClose}
      fields={fields}
      onSubmit={submitFormValues}
      mode={track ? "edit" : "create"}
    >
      <TextInput key="name" withAsterisk label="Name" placeholder="name" />
      <Select
        key="parent_id"
        label="Parent"
        placeholder="parent track"
        data={parentTrackData()}
      />
    </MutateItemModal>
  );
}
