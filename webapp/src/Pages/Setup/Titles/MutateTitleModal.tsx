import { Select } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { MutateTitle, Title } from "../../../Client/Title";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import { useLevel } from "@/Client/Level";
import { useTrack } from "@/Client/Track";

export interface MutateTitleModalProps {
  title?: Title;
  opened: boolean;
  onSubmit: (title: MutateTitle) => void;
  onClose: () => void;
}

export function MutateTitleModal({
  title,
  opened,
  onSubmit,
  onClose,
}: MutateTitleModalProps) {
  const { items: levels } = useLevel();
  const { items: tracks } = useTrack();

  const submitFormValues = (values: MutateItemFormValues) => {
    const title: MutateTitle = {
      name: values.name,
      level_id: parseInt(values.level_id),
      track_id: parseInt(values.track_id),
    };
    console.log("submitFormValues", values);
    onSubmit(title);
  };

  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      value: title?.name,
      validation: (value) => nonEmptyString(value, "Title is required"),
    },
    {
      key: "level_id",
      value: title?.level_id.toString(),
      validation: (value) => nonEmptyString(value, "Level is required"),
    },
    {
      key: "track_id",
      value: title?.track_id?.toString() ?? "0",
    },
  ];

  return (
    <MutateItemModal
      title={title ? "Edit Title" : "Add Title"}
      opened={opened}
      onClose={onClose}
      fields={fields}
      onSubmit={submitFormValues}
      mode={title ? "edit" : "create"}
    >
      <TextInput
        key="name"
        label="Title"
        placeholder="title"
      />
      <Select
        key="level_id"
        label="Level"
        placeholder="select level"
        data={levels.reduce((acc, level) => {
          const title = `${level.index} (${level.external_id})`;
          acc.push({
            value: level.id.toString(),
            label: title,
          });
          return acc;
        }, [] as { value: string; label: string }[])}
      />
      <Select
        clearable
        key="track_id"
        label="Track"
        placeholder="select track"
        data={tracks.reduce((acc, track) => {
          const title = track.name;
          acc.push({
            value: track.id.toString(),
            label: title,
          });
          return acc;
        }, [] as { value: string; label: string }[])}
      />
    </MutateItemModal>
  );
}
