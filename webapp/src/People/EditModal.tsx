import { useState } from "react";
import { Avatar, Text, Button, Paper, Modal, Group } from "@mantine/core";
import { TextInput, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Individual } from "../Client/Individual";

interface EditIndividualFormProps {
  individual: Individual;
  opened: boolean;
  onEditFormSubmit: (updatedIndividual: Individual) => void;
  onClose: () => void;
}

type EditIndividualFormValues = {
  first_name: string;
  middle_names: string;
  last_name: string;
};

export function EditIndividualModal({
  individual,
  opened,
  onEditFormSubmit,
  onClose,
}: EditIndividualFormProps) {
  const form = useForm({
    initialValues: {
      first_name: individual.first_name,
      middle_names: individual.middle_names,
      last_name: individual.last_name,
    },

    validate: {
      first_name: (value) =>
        /^\S+$/.test(value) ? null : "First name is required",
      last_name: (value) =>
        /^\S+$/.test(value) ? null : "Last name is required",
    },
  });

  const submitForm = (values: EditIndividualFormValues) => {
    // Make sure we update a copy, not the actual individual
    let updatedIndividual = {
      ...individual,
    };
    updatedIndividual.first_name = values.first_name;
    updatedIndividual.middle_names = values.middle_names;
    updatedIndividual.last_name = values.last_name;
    onEditFormSubmit(updatedIndividual);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Individual">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(submitForm)}>
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
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
