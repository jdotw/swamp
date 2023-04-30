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
import { DeploymentType, MutateDeploymentType } from "../../../Client/DeploymentTypes";

export interface MutateDeploymentTypeModalProps {
  deploymentType?: DeploymentType;
  parentCandidates?: DeploymentType[];
  opened: boolean;
  onSubmit: (deploymentType: MutateDeploymentType) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
}

export function MutateDeploymentTypeModal({
  deploymentType,
  parentCandidates,
  opened,
  onSubmit,
  onClose,
  mode,
}: MutateDeploymentTypeModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      initialValue: deploymentType?.name ?? "",
      validation: (value) => nonEmptyString(value, "Name is required"),
    },
    {
      key: "parent_id",
      initialValue: "",
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual deploymentType
    let deploymentType: MutateDeploymentType = {
      name: values.name,
      parent_id: parseInt(values.parent_id) ?? undefined,
    };
    onSubmit(deploymentType);
  };

  const parentDeploymentTypeData = () =>
    (parentCandidates ?? []).map((deploymentType) => ({
      value: deploymentType.id.toString(),
      label: deploymentType.name,
    })) as SelectItem[];
    
  return (
    <MutateItemModal
      title={mode === "edit" ? "Edit Deployment Type" : "Add Deployment Type"}
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
        placeholder="parent deploymentType"
        data={parentDeploymentTypeData()}
      />
    </MutateItemModal>
  );
}
