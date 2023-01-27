import { useState } from "react";
import { Avatar, Text, Button, Paper, Modal, Group } from "@mantine/core";
import { TextInput, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
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
  opened: boolean;
  onSubmit: (level: MutateLevel) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
}

export function MutateLevelModal({
  level,
  opened,
  onSubmit,
  onClose,
  mode,
}: MutateLevelModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "index",
      initialValue: level?.index.toString() ?? "",
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
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual level
    let level: MutateLevel = {
      index: parseInt(values.index),
      external_id: values.external_id,
      individual_contributor_title: values.individual_contributor_title,
      manager_title: values.manager_title,
    };
    onSubmit(level);
  };

  return (
    <MutateItemModal
      title={mode === "edit" ? "Edit Level" : "Add Level"}
      opened={opened}
      onClose={onClose}
      fields={fields}
      onSubmit={submitFormValues}
      mode={mode}
    >
      <TextInput
        key="index"
        withAsterisk
        label="Index"
        placeholder="level index"
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
