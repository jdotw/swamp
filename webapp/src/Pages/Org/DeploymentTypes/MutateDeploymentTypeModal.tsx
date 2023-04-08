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
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";

export interface MutateDeploymentTypeModalProps {
  capability?: DeploymentType;
  capabilities?: DeploymentType[];
  opened: boolean;
  onSubmit: (capability: MutateDeploymentType) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
}

export function MutateDeploymentTypeModal({
  capability,
  capabilities,
  opened,
  onSubmit,
  onClose,
  mode,
}: MutateDeploymentTypeModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "title",
      initialValue: capability?.title ?? "",
      validation: (value) => nonEmptyString(value, "Title is required"),
    },
    {
      key: "parent_id",
      initialValue: "",
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual capability
    let capability: MutateDeploymentType = {
      title: values.title,
      parent_id: parseInt(values.parent_id) ?? undefined,
    };
    onSubmit(capability);
  };

  const parentDeploymentTypeData = () =>
    (capabilities ?? []).map((capability) => ({
      value: capability.id.toString(),
      label: capability.title,
    })) as SelectItem[];
    
  console.log("Cap: ", capabilities);

  return (
    <MutateItemModal
      title={mode === "edit" ? "Edit DeploymentType" : "Add DeploymentType"}
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
        placeholder="parent capability"
        data={parentDeploymentTypeData()}
      />
    </MutateItemModal>
  );
}
