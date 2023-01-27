import { useState } from "react";
import { Avatar, Text, Button, Paper, Modal, Group } from "@mantine/core";
import { TextInput, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MutateRoleType, RoleType } from "../../../Client/RoleType";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";

export interface MutateRoleTypeModalProps {
  roleType?: RoleType;
  opened: boolean;
  onSubmit: (roleType: MutateRoleType) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
}

export function MutateRoleTypeModal({
  roleType,
  opened,
  onSubmit,
  onClose,
  mode,
}: MutateRoleTypeModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "title",
      initialValue: roleType?.title ?? "",
      validation: (value) => nonEmptyString(value, "Title is required"),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual roleType
    let roleType: MutateRoleType = {
      title: values.title,
    };
    onSubmit(roleType);
  };

  return (
    <MutateItemModal
      title={mode === "edit" ? "Edit RoleType" : "Add RoleType"}
      opened={opened}
      onClose={onClose}
      fields={fields}
      onSubmit={submitFormValues}
      mode={mode}
    >
      <TextInput key="title" withAsterisk label="Title" placeholder="title" />
    </MutateItemModal>
  );
}
