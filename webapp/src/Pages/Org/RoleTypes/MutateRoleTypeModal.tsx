import { useState } from "react";
import {
  Avatar,
  Text,
  Button,
  Paper,
  Modal,
  Group,
  Select,
  SelectItem,
} from "@mantine/core";
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
  roleTypes?: RoleType[];
  opened: boolean;
  onSubmit: (roleType: MutateRoleType) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
}

export function MutateRoleTypeModal({
  roleType,
  roleTypes,
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
    {
      key: "parent_id",
      initialValue: "",
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual roleType
    let roleType: MutateRoleType = {
      title: values.title,
      parent_id: parseInt(values.parent_id) ?? undefined,
    };
    onSubmit(roleType);
  };

  const parentRoleTypeData = () =>
    (roleTypes ?? []).map((roleType) => ({
      value: roleType.id.toString(),
      label: roleType.title,
    })) as SelectItem[];

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
      <Select
        key="parent_id"
        label="Parent"
        placeholder="parent role type"
        data={parentRoleTypeData()}
      />
    </MutateItemModal>
  );
}
