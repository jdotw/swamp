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
import { MutateDelivery, Delivery } from "../../../Client/Delivery";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";

export interface MutateDeliveryModalProps {
  capability?: Delivery;
  capabilities?: Delivery[];
  opened: boolean;
  onSubmit: (capability: MutateDelivery) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
}

export function MutateDeliveryTeamModal({
  capability,
  capabilities,
  opened,
  onSubmit,
  onClose,
  mode,
}: MutateDeliveryModalProps) {
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
    let capability: MutateDelivery = {
      title: values.title,
      parent_id: parseInt(values.parent_id) ?? undefined,
    };
    onSubmit(capability);
  };

  const parentDeliveryData = () =>
    (capabilities ?? []).map((capability) => ({
      value: capability.id.toString(),
      label: capability.title,
    })) as SelectItem[];
    
  console.log("Cap: ", capabilities);

  return (
    <MutateItemModal
      title={mode === "edit" ? "Edit Delivery" : "Add Delivery"}
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
        data={parentDeliveryData()}
      />
    </MutateItemModal>
  );
}
