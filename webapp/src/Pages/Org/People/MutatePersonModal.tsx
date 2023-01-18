import { useState } from "react";
import { Avatar, Text, Button, Paper, Modal, Group } from "@mantine/core";
import { TextInput, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Person, MutatePerson } from "../../../Client/Person";

export enum MutatePersonModalMode {
  Edit,
  Create,
}

interface MutatePersonModalProps {
  individual?: Person;
  opened: boolean;
  onSubmit: (updatedPerson: MutatePerson) => void;
  onClose: () => void;
  mode?: MutatePersonModalMode;
  title: string;
}

type MutatePersonModalValues = {
  first_name: string;
  middle_names?: string;
  last_name: string;
  external_id: string;
};

export function MutatePersonModal({
  individual,
  opened,
  onSubmit,
  onClose,
  mode = MutatePersonModalMode.Create,
  title,
}: MutatePersonModalProps) {
  const form = useForm({
    initialValues: {
      first_name: individual?.first_name ?? "",
      middle_names: individual?.middle_names ?? "",
      last_name: individual?.last_name ?? "",
      external_id: individual?.external_id ?? "",
    },

    validate: {
      external_id: (value) =>
        mode === MutatePersonModalMode.Create
          ? /^(?!\s*$).+/.test(value)
            ? null
            : "External ID is required"
          : null,
      first_name: (value) =>
        /^(?!\s*$).+/.test(value) ? null : "First name is required",
      last_name: (value) =>
        /^(?!\s*$).+/.test(value) ? null : "Last name is required",
    },
  });

  const submitForm = (values: MutatePersonModalValues) => {
    // Make sure we update a copy, not the actual individual
    let updatedPerson: MutatePerson = {
      ...individual,
      external_id:
        mode === MutatePersonModalMode.Edit
          ? individual!.external_id
          : values.external_id,
      first_name: values.first_name,
      middle_names: values.middle_names,
      last_name: values.last_name,
    };
    onSubmit(updatedPerson);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(submitForm)}>
          {mode === MutatePersonModalMode.Create && (
            <TextInput
              withAsterisk
              label="External ID"
              placeholder="external ID"
              {...form.getInputProps("external_id")}
            />
          )}
          <TextInput
            withAsterisk
            label="First Name"
            placeholder="first name"
            {...form.getInputProps("first_name")}
          />
          <TextInput
            label="Middle Names"
            placeholder="middle names (optional)"
            {...form.getInputProps("middle_names")}
          />
          <TextInput
            withAsterisk
            label="Last Name"
            placeholder="last name"
            {...form.getInputProps("last_name")}
          />
          <Group position="right" mt="md">
            <Button variant="outline" onClick={cancelClicked}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === MutatePersonModalMode.Create && "Add"}
              {mode === MutatePersonModalMode.Edit && "Save"}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
