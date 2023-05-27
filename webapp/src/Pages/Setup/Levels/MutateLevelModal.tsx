import { Select } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { useState } from "react";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import { Level, LevelCreateInput, LevelUpdateInput } from "@/Utils/trpc";

export interface MutateLevelModalProps {
  level?: Level;
  parent_levels?: Level[];
  opened: boolean;
  onSubmit: (level: LevelCreateInput | LevelUpdateInput) => void;
  onClose: () => void;
}

export function MutateLevelModal({
  level,
  parent_levels,
  opened,
  onSubmit,
  onClose,
}: MutateLevelModalProps) {
  const [selectedParent, setSelectedParent] = useState<Level>();

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual level
    const level = {
      index: parseInt(values.index),
      name: values.name,
      external_id: values.external_id,
      parent_id: values.parent_id ? parseInt(values.parent_id) : undefined,
    };
    onSubmit(level);
    setSelectedParent(undefined);
  };

  const onChange = (values: MutateItemFormValues) => {
    // We keep track of the selected parent because if a
    // parent is selected then the index must be set to the
    // index of the parent and cannot be edited
    const parent = parent_levels?.find(
      (parent_level) => parent_level.id.toString() === values.parent_id
    );
    setSelectedParent(parent);
  };

  const onModalClosed = () => {
    setSelectedParent(undefined);
    onClose();
  };

  const fields: MutateItemModalFormField[] = [
    {
      key: "index",
      validation: (value) => nonEmptyString(value, "Index is required"),
      value: level
        ? level.index.toString()
        : selectedParent?.index.toString() ?? "",
    },
    {
      key: "external_id",
      validation: (value) => nonEmptyString(value, "External ID is required"),
      value: level?.external_id ?? "",
    },
    {
      key: "name",
      validation: (value) => nonEmptyString(value, "Name is required"),
      value: level?.name ?? "",
    },
    {
      key: "parent_id",
      value: level
        ? level.parent_id?.toString()
        : selectedParent?.id.toString() ?? "",
    },
  ];

  return (
    <MutateItemModal
      title={level ? "Edit Level" : "Add Level"}
      opened={opened}
      onClose={onModalClosed}
      fields={fields}
      onSubmit={submitFormValues}
      mode={level ? "edit" : "create"}
      onChange={onChange}
    >
      {parent_levels && (
        <Select
          key="parent_id"
          label="Parent"
          placeholder={level ? "none" : "select parent level"}
          disabled={level !== undefined}
          data={parent_levels.map((parent_level) => {
            const label = `${parent_level.name
              } - ${parent_level.index.toString()} (${parent_level.external_id})`;
            return {
              value: parent_level.id.toString(),
              label: label,
            };
          })}
        />
      )}
      <TextInput
        key="index"
        withAsterisk
        label="Index"
        placeholder="level index"
        disabled={level !== undefined || selectedParent !== undefined}
      />
      <TextInput key="name" withAsterisk label="Name" placeholder="name" />
      <TextInput
        key="external_id"
        label="External ID"
        placeholder="external id"
      />
    </MutateItemModal>
  );
}
