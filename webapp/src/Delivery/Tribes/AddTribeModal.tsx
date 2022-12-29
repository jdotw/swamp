import { useState } from "react";
import { Avatar, Text, Button, Paper, Modal, Group } from "@mantine/core";
import { TextInput, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NewTribe, Tribe } from "../../Client/Tribe";

interface AddTribeFormProps {
  opened: boolean;
  onSubmit: (tribe: NewTribe) => void;
  onClose: () => void;
}

type AddTribeFormValues = {
  name: string;
};

export function AddTribeModal({
  opened,
  onSubmit,
  onClose,
}: AddTribeFormProps) {
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (/^[\s\w]+$/.test(value) ? null : "Name is required"),
    },
  });

  const submitForm = (values: AddTribeFormValues) => {
    // Make sure we update a copy, not the actual tribe
    let tribe: NewTribe = {
      name: values.name,
    };
    onSubmit(tribe);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Tribe">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(submitForm)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="tribe name"
            {...form.getInputProps("name")}
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
