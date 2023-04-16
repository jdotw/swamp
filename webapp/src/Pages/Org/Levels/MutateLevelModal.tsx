import { Select } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useState } from "react";
import { MutateLevel, Level } from "../../../Client/Level";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";

export interface MutateLevelModalProps {
  level?: Level;
  parent_levels?: Level[];
  opened: boolean;
  onSubmit: (level: MutateLevel) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
}

export function MutateLevelModal({
  level,
  parent_levels,
  opened,
  onSubmit,
  onClose,
  mode,
}: MutateLevelModalProps) {
  const [selectedParent, setSelectedParent] = useState<Level>();

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual level
    let level: MutateLevel = {
      index: parseInt(values.index),
      external_id: values.external_id,
      individual_contributor_title: values.individual_contributor_title,
      manager_title: values.manager_title,
      parent_id: values.parent_id ? parseInt(values.parent_id) : undefined,
    };
    onSubmit(level);
  };

  const onChange = (values: MutateItemFormValues, form: UseFormReturnType<MutateItemFormValues, (values: MutateItemFormValues) => MutateItemFormValues>) => {
    const parent = parent_levels?.find(
      (parent_level) => parent_level.id.toString() === values.parent_id
    );
    setSelectedParent(parent);
    if (parent) {
      form.setFieldValue("index", parent.index.toString());
    }
  }
  
  const fields: MutateItemModalFormField[] = [
    {
      key: "index",
      initialValue: level?.index.toString() ?? (selectedParent?.index.toString() ?? ""),
      validation: (value) => nonEmptyString(value, "Index is required"),
    },
    {
      key: "external_id",
      initialValue: level?.external_id ?? "",
      validation: (value) => nonEmptyString(value, "External ID is required"),
    },
    {
      key: "individual_contributor_title",
      initialValue: level?.individual_contributor_title ?? "",
    },
    {
      key: "manager_title",
      initialValue: level?.manager_title ?? "",
    },
    {
      key: "parent_id",
      initialValue: level?.parent_id?.toString() ?? "",
    },
  ];

  return (
    <MutateItemModal
      title={mode === "edit" ? "Edit Level" : "Add Level"}
      opened={opened}
      onClose={onClose}
      fields={fields}
      onSubmit={submitFormValues}
      mode={mode}
      onChange={onChange}
    >
      {parent_levels && 
        <Select
          key="parent_id"
          label="Parent"
          placeholder="select parent level"
          data={parent_levels.map((parent_level) => {
            const title = `${parent_level.individual_contributor_title} / ${parent_level.manager_title}`;
            return {
              value: parent_level.id.toString(),
              label: title,
            };
          })}
        />
      }
      <TextInput
        key="index"
        withAsterisk
        label="Index"
        placeholder="level index"
        disabled={selectedParent !== undefined}
      />
      <TextInput
        key="external_id"
        label="External ID"
        placeholder="external id"
      />
      <TextInput
        key="individual_contributor_title"
        label="Individual Contributor Title"
        placeholder="individual contributor title"
      />
      <TextInput
        key="manager_title"
        label="Manager Title"
        placeholder="manager title"
      />

    </MutateItemModal>
  );
}
