import { useState } from "react";
import { Avatar, Text, Button, Paper, Modal, Group } from "@mantine/core";
import { TextInput, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MutateTribe, Tribe } from "../../../Client/Tribe";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";

export interface MutateTribeModalProps {
  tribe?: Tribe;
  opened: boolean;
  onSubmit: (tribe: MutateTribe) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
}

export function MutateTribeModal({
  tribe,
  opened,
  onSubmit,
  onClose,
  mode,
}: MutateTribeModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      initialValue: tribe?.name ?? "",
      validation: (value) => nonEmptyString(value, "Name is required"),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual tribe
    let tribe: MutateTribe = {
      name: values.name,
      formed_date: new Date().toISOString(),
    };
    onSubmit(tribe);
  };

  return (
    <MutateItemModal
      title={mode === "edit" ? "Edit Tribe" : "Add Tribe"}
      opened={opened}
      onClose={onClose}
      fields={fields}
      onSubmit={submitFormValues}
      mode={mode}
    >
      <TextInput
        key="name"
        withAsterisk
        label="Name"
        placeholder="tribe name"
      />
    </MutateItemModal>
  );
}
