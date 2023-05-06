import { Select } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useState } from "react";
import { MutateTitle, Title } from "../../../Client/Title";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";

export interface MutateTitleModalProps {
  title?: Title;
  parent_titles?: Title[];
  opened: boolean;
  onSubmit: (title: MutateTitle) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
}

export function MutateTitleModal({
  title,
  parent_titles,
  opened,
  onSubmit,
  onClose,
  mode,
}: MutateTitleModalProps) {
  const [selectedParent, setSelectedParent] = useState<Title>();

  const submitFormValues = (values: MutateItemFormValues) => {
    const title: MutateTitle = {
      name: values.name,
    };
    onSubmit(title);
  };

  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      initialValue: title?.name ?? "",
      validation: (value) => nonEmptyString(value, "Title is required"),
    },
  ];

  return (
    <MutateItemModal
      title={mode === "edit" ? "Edit Title" : "Add Title"}
      opened={opened}
      onClose={onClose}
      fields={fields}
      onSubmit={submitFormValues}
      mode={mode}
    >
      <TextInput
        key="name"
        label="Title"
        placeholder="title"
      />
    </MutateItemModal>
  );
}
