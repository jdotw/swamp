import { useState } from "react";
import { Avatar, Text, Button, Paper, Modal, Group } from "@mantine/core";
import { TextInput, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NewPractice, Practice } from "../../Client/Practice";

interface AddPracticeFormProps {
  opened: boolean;
  onSubmit: (practice: NewPractice) => void;
  onClose: () => void;
}

type AddPracticeFormValues = {
  name: string;
};

export function AddPracticeModal({
  opened,
  onSubmit,
  onClose,
}: AddPracticeFormProps) {
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (/^[\s\w]+$/.test(value) ? null : "Name is required"),
    },
  });

  const submitForm = (values: AddPracticeFormValues) => {
    // Make sure we update a copy, not the actual practice
    let practice: NewPractice = {
      name: values.name,
    };
    onSubmit(practice);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Practice">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(submitForm)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="practice name"
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
