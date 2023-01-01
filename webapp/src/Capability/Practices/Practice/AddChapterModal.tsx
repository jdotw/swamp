import { useState } from "react";
import { Avatar, Text, Button, Paper, Modal, Group } from "@mantine/core";
import { TextInput, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NewChapter } from "../../../Client/Practice";

interface AddChapterModalProps {
  opened: boolean;
  onSubmit: (chapter: NewChapter) => void;
  onClose: () => void;
}

type AddChapterModalValues = {
  name: string;
};

export function AddChapterModal({
  opened,
  onSubmit,
  onClose,
}: AddChapterModalProps) {
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (/^(?!\s*$).+/.test(value) ? null : "Name is required"),
    },
  });

  const submitForm = (values: AddChapterModalValues) => {
    // Make sure we update a copy, not the actual chapter
    let chapter: NewChapter = {
      name: values.name,
    };
    onSubmit(chapter);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Chapter">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(submitForm)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="chapter name"
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
