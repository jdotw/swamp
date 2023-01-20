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

interface MutatePersonModalProps {
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
      id: "first_name",
      initialValue: person?.first_name ?? "",
      validation: (value) => nonEmptyString(value, "First name is required"),
      element: (
        <TextInput withAsterisk label="First Name" placeholder="first name" />
      ),
    },
    {
      id: "external_id",
      initialValue: person?.external_id ?? "",
      validation: (value) => nonEmptyString(value, "External ID is required"),
      element:
        mode === "create" ? (
          <TextInput
            withAsterisk
            label="External ID"
            placeholder="external ID"
          />
        ) : undefined,
    },
    {
      id: "middle_names",
      initialValue: person?.middle_names ?? "",
      element: (
        <TextInput label="Middle Names" placeholder="middle names (optional)" />
      ),
    },
    {
      id: "last_name",
      initialValue: person?.last_name ?? "",
      validation: (value) => nonEmptyString(value, "Last name is required"),
      element: (
        <TextInput withAsterisk label="Last Name" placeholder="last name" />
      ),
    },
  ];

  const onSubmitFormValues = (values: MutateItemFormValues) => {
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
      onSubmit={onSubmitFormValues}
      onClose={onClose}
      title={title}
    ></MutateItemModal>
  );
}
