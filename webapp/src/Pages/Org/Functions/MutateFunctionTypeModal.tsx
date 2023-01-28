import { useState } from "react";
import { Avatar, Text, Button, Paper, Modal, Group } from "@mantine/core";
import { TextInput, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MutateFunctionType, FunctionType } from "../../../Client/FunctionType";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";

export interface MutateFunctionTypeModalProps {
  functionType?: FunctionType;
  opened: boolean;
  onSubmit: (functionType: MutateFunctionType) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
}

export function MutateFunctionTypeModal({
  functionType,
  opened,
  onSubmit,
  onClose,
  mode,
}: MutateFunctionTypeModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      initialValue: functionType?.name ?? "",
      validation: (value) => nonEmptyString(value, "Name is required"),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual functionType
    let functionType: MutateFunctionType = {
      name: values.name,
    };
    onSubmit(functionType);
  };

  return (
    <MutateItemModal
      title={mode === "edit" ? "Edit Function" : "Add Function"}
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
        placeholder="function name"
      />
    </MutateItemModal>
  );
}
