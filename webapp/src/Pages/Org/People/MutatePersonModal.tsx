import { useState } from "react";
import { Avatar, Text, Button, Paper, Modal, Group } from "@mantine/core";
import { TextInput, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Person, MutatePerson } from "../../../Client/Person";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";

export interface MutatePersonModalProps {
  person?: Person;
  opened: boolean;
  onSubmit: (updatedPerson: MutatePerson) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
  title: string;
}

export function MutatePersonModal({
  person,
  opened,
  onSubmit,
  onClose,
  mode = "create",
  title,
}: MutatePersonModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "first_name",
      initialValue: person?.first_name ?? "",
      validation: (value) => nonEmptyString(value, "First name is required"),
    },
    {
      key: "external_id",
      initialValue: person?.external_id ?? "",
      validation: (value) => nonEmptyString(value, "External ID is required"),
    },
    {
      key: "middle_names",
      initialValue: person?.middle_names ?? "",
    },
    {
      key: "last_name",
      initialValue: person?.last_name ?? "",
      validation: (value) => nonEmptyString(value, "Last name is required"),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual person
    let updatedPerson: MutatePerson = {
      ...person,
      external_id: mode === "edit" ? person!.external_id : values.external_id,
      first_name: values.first_name,
      middle_names: values.middle_names,
      last_name: values.last_name,
    };
    onSubmit(updatedPerson);
  };

  return (
    <MutateItemModal
      mode={mode}
      fields={fields}
      opened={opened}
      onSubmit={submitFormValues}
      onClose={onClose}
      title={title}
    >
      {mode === "create" && (
        <TextInput
          key="external_id"
          withAsterisk
          label="External ID"
          placeholder="external ID"
        />
      )}
      <TextInput
        key="first_name"
        withAsterisk
        label="First Name"
        placeholder="first name"
      />
      <TextInput
        key="middle_names"
        label="Middle Names"
        placeholder="middle names (optional)"
      />
      <TextInput
        key="last_name"
        withAsterisk
        label="Last Name"
        placeholder="last name"
      />
    </MutateItemModal>
  );
}
