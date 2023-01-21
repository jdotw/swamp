import { useState } from "react";
import { Avatar, Text, Button, Paper, Modal, Group } from "@mantine/core";
import { TextInput, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Chapter, MutateChapter } from "../../../../Client/Chapter";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../../../../Components/MutateItemModal/MutateItemModal";

export interface MutateChapterModalProps {
  chapter?: Chapter;
  opened: boolean;
  onSubmit: (chapter: MutateChapter) => void;
  onClose: () => void;
}

export function MutateChapterModal({
  chapter,
  opened,
  onSubmit,
  onClose,
}: MutateChapterModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      initialValue: chapter?.name ?? "",
      validation: (value) => nonEmptyString(value, "Name is required"),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual chapter
    let chapter: MutateChapter = {
      name: values.name,
      formed_date: new Date().toISOString(),
    };
    onSubmit(chapter);
  };

  return (
    <MutateItemModal
      title={chapter ? "Edit Chapter" : "Add Chapter"}
      mode={chapter ? "edit" : "create"}
      opened={opened}
      onClose={onClose}
      fields={fields}
      onSubmit={submitFormValues}
    >
      <TextInput
        key="name"
        withAsterisk
        label="Name"
        placeholder="chapter name"
      />
    </MutateItemModal>
  );
}
