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
import { Track, MutateTrack } from "../../../Client/Tracks";

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
  mode,
}: MutateTrackModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      initialValue: track?.name ?? "",
      validation: (value) => nonEmptyString(value, "Name is required"),
    },
    {
      key: "parent_id",
      initialValue: "",
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual track
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
      title={mode === "edit" ? "Edit Track" : "Add Track"}
      opened={opened}
      onClose={onClose}
      fields={fields}
      onSubmit={submitFormValues}
      mode={mode}
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
