import { useState } from "react";
import { Avatar, Text, Button, Paper, Modal, Group } from "@mantine/core";
import { TextInput, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Individual, MutateIndividual } from "../Client/Individual";

export enum MutateIndividualModalMode {
  Edit,
  Create,
}

interface MutateIndividualModalProps {
  individual?: Individual;
  opened: boolean;
  onSubmit: (updatedIndividual: MutateIndividual) => void;
  onClose: () => void;
  mode?: MutateIndividualModalMode;
  title: string;
}

type MutateIndividualModalValues = {
  first_name: string;
  middle_names?: string;
  last_name: string;
  external_id: string;
};

export function MutateIndividualModal({
  individual,
  opened,
  onSubmit,
  onClose,
  mode = MutateIndividualModalMode.Create,
  title,
}: MutateIndividualModalProps) {
  const form = useForm({
    initialValues: {
      first_name: individual?.first_name ?? "",
      middle_names: individual?.middle_names ?? "",
      last_name: individual?.last_name ?? "",
      external_id: individual?.external_id ?? "",
    },

    validate: {
      external_id: (value) =>
        mode === MutateIndividualModalMode.Create
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

  const submitForm = (values: MutateIndividualModalValues) => {
    // Make sure we update a copy, not the actual individual
    let updatedIndividual: MutateIndividual = {
      ...individual,
      external_id:
        mode === MutateIndividualModalMode.Edit
          ? individual!.external_id
          : values.external_id,
      first_name: values.first_name,
      middle_names: values.middle_names,
      last_name: values.last_name,
    };
    onSubmit(updatedIndividual);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(submitForm)}>
          {mode === MutateIndividualModalMode.Create && (
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
              {mode === MutateIndividualModalMode.Create && "Add"}
              {mode === MutateIndividualModalMode.Edit && "Save"}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
